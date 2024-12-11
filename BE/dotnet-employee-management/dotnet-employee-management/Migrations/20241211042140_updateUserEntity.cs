using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnet_employee_management.Migrations
{
    /// <inheritdoc />
    public partial class updateUserEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PASSWORD",
                table: "USERS",
                type: "NVARCHAR2(2000)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PASSWORD",
                table: "USERS");
        }
    }
}
