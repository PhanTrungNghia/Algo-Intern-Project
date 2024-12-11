﻿using dotnet_employee_management.Models;

namespace dotnet_employee_management.Repository
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User> GetByUsernamePassword(string username, string password);
    }
}