using System.Data;
using Dapper;
using dotnet_employee_management.Models;
using Oracle.ManagedDataAccess.Client;

namespace dotnet_employee_management.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;

        public UserRepository(IConfiguration config)
        {
            _config = config;
        }

        public async Task<int> AddAsync(User user)
        {
            var sql = "INSERT INTO USERS (NAME, PASSWORD, TOKEN)" +
                "VALUES (:NAME, :PASSWORD, :TOKEN)";
            using IDbConnection connection = new OracleConnection(_config.GetConnectionString("OracleConnStr"));
            return await connection.ExecuteAsync(sql, user);
        }

        public async Task<int> DeleteAsync(int id)
        {
            var sql = "DELETE FROM USERS WHERE ID = :ID";
            using IDbConnection connection = new OracleConnection(_config.GetConnectionString("OracleConnStr"));
            return await connection.ExecuteAsync(sql, new { ID = id });
        }

        public async Task<IReadOnlyList<User>> GetAllAsync()
        {
            var sql = "SELECT * FROM USERS";
            using IDbConnection connection = new OracleConnection(_config.GetConnectionString("OracleConnStr"));
            var result = await connection.QueryAsync<User>(sql);
            return result.ToList();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM USERS WHERE ID = :ID";
            using IDbConnection connection = new OracleConnection(_config.GetConnectionString("OracleConnStr"));

            var result = await connection.QuerySingleOrDefaultAsync<User>(sql, new { ID = id });
            return result ?? null;
        }

        public async Task<int> UpdateAsync(User user)
        {
            var sql = "UPDATE USERS " +
            "SET NAME = :NAME, PASSWORD = :PASSWORD, TOKEN = :TOKEN " +
            "WHERE IDEmployee = :IdEmployee";
            using IDbConnection connection = new OracleConnection(_config.GetConnectionString("OracleConnStr"));

            var result = await connection.ExecuteAsync(sql, user);
            return result;
        }

        public async Task<User> GetByUsernamePassword(string username, string password)
        {
            var sql = "SELECT * FROM USERS WHERE NAME = :NAME AND PASSWORD = :PASSWORD";
            using IDbConnection connection = new OracleConnection(_config.GetConnectionString("OracleConnStr"));

            var result = await connection.QuerySingleOrDefaultAsync<User>(sql, new { NAME = username, PASSWORD = password });
            return result ?? null;
        }
    }
}
