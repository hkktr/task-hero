using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskHero.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddApprovalStatusToRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApprovalStatus",
                table: "Requests",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApprovalStatus",
                table: "Requests");
        }
    }
}
