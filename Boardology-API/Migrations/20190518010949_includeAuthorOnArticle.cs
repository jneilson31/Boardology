using Microsoft.EntityFrameworkCore.Migrations;

namespace Boardology.API.Migrations
{
    public partial class includeAuthorOnArticle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "Articles",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Author",
                table: "Articles");
        }
    }
}
