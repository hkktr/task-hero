using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskHero.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddMoreDetailedLocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Location_Longitude",
                table: "Requests",
                newName: "Location_LatLong_Longitude");

            migrationBuilder.RenameColumn(
                name: "Location_Latitude",
                table: "Requests",
                newName: "Location_LatLong_Latitude");

            migrationBuilder.AddColumn<string>(
                name: "Location_FullAddress",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location_Name",
                table: "Requests",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location_FullAddress",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "Location_Name",
                table: "Requests");

            migrationBuilder.RenameColumn(
                name: "Location_LatLong_Longitude",
                table: "Requests",
                newName: "Location_Longitude");

            migrationBuilder.RenameColumn(
                name: "Location_LatLong_Latitude",
                table: "Requests",
                newName: "Location_Latitude");
        }
    }
}
