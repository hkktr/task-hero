using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskHero.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddLocationToReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Location_Latitude",
                table: "Reports",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Location_Longitude",
                table: "Reports",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location_Latitude",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "Location_Longitude",
                table: "Reports");
        }
    }
}
