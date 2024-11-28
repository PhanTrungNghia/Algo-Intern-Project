namespace dotnet_employee_management.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IEmployeeRepository _employees;

        public UnitOfWork(IEmployeeRepository employees)
        {
            _employees = employees;
        }

        public IEmployeeRepository Employees => _employees;
    }
}
