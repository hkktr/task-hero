using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskHero.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddImageProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UploaderId",
                table: "Images",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Images_UploaderId",
                table: "Images",
                column: "UploaderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Users_UploaderId",
                table: "Images",
                column: "UploaderId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Users_UploaderId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_UploaderId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "UploaderId",
                table: "Images");
        }
    }
}
