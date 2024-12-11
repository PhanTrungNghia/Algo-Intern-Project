using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using dotnet_employee_management.Dto.Request;
using dotnet_employee_management.Models;
using dotnet_employee_management.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace dotnet_employee_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IUserService userService, ILogger<AuthController> logger)
        {
            _userService = userService;
            _logger = logger;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginInfo userLogin)
        {

            User user = await _userService.GetByUsernamePassword(userLogin.Username, userLogin.Password);

            if (user != null)
            {
                var token = GenerateJwtToken(userLogin.Username);
                return Ok(new { user.ID, user.NAME, token });
            }    
            return Unauthorized();
        }

        private string GenerateJwtToken(string username)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            // SymmetricSecurityKey là một lớp dùng để tạo khóa bí mật (secret key) cho việc ký và xác thực JWT.
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ByYM000OLlMQG6VVVp1OH7Xzyr7gHuw1qvUC5dcGt3SNM"));
            // SigningCredentials là một lớp đại diện cho thông tin cần thiết để ký token (trong trường hợp này là JWT).
            // Nó yêu cầu một khóa bí mật (key) và thuật toán dùng để ký.
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "http://localhost:4200",
                audience: "http://localhost:5088",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
