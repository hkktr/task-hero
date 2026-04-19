using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskHero.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRequestedByToRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RequestedById",
                table: "Requests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Requests_RequestedById",
                table: "Requests",
                column: "RequestedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Users_RequestedById",
                table: "Requests",
                column: "RequestedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Users_RequestedById",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_RequestedById",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "RequestedById",
                table: "Requests");
        }
    }
}
