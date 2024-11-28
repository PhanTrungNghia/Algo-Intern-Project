using Dapper;
using dotnet_employee_management.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace dotnet_employee_management.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly IConfiguration _config;

        public EmployeeRepository(IConfiguration config) { 
            _config = config;
        }

        public async Task<int> AddAsync(Employee employ)
        {
            var sql = "INSERT INTO Employees (Name, Age, IsActive)" +
                "VALUES (@Name, @Age, @IsActive)";
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("MySqlConnection"));
            return await connection.ExecuteAsync(sql, employ);
        }

        public async Task<int> DeleteAsync(int id)
        {
            var sql = "DELETE FROM Employees WHERE IDEmployee = @IdEmployee";
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("MySqlConnection"));
            return await connection.ExecuteAsync(sql, new { IdEmployee = id });
        }

        public async Task<IReadOnlyList<Employee>> GetAllAsync()
        {
            var sql = "SELECT * FROM Employees";
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("MySqlConnection"));
            var result = await connection.QueryAsync<Employee>(sql);
            return result.ToList();
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM Employees WHERE IDEmployee = @IdEmployee";
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("MySqlConnection"));

            var result = await connection.QuerySingleOrDefaultAsync<Employee>(sql, new { IdEmployee = id });
            return result ?? null;
        }

        public async Task<int> UpdateAsync(Employee employ)
        {
            var sql = "UPDATE Employees " +
                        "SET Name = @Name, Age = @Age, IsActive = @IsActive " +
                        "WHERE IDEmployee = @IdEmployee";
            using IDbConnection connection = new SqlConnection(_config.GetConnectionString("MySqlConnection"));

            var result = await connection.ExecuteAsync(sql, employ);
            return result;
        }
    }
}
