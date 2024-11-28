namespace dotnet_employee_management.Repository
{
    public interface IUnitOfWork
    {
        IEmployeeRepository Employees { get; }
    }
}
