using Microsoft.EntityFrameworkCore.Migrations;

namespace Boardology.API.Migrations
{
    public partial class upvotedownvote : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Downvotes",
                columns: table => new
                {
                    DownVoterId = table.Column<int>(nullable: false),
                    GameId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Downvotes", x => new { x.DownVoterId, x.GameId });
                    table.ForeignKey(
                        name: "FK_Downvotes_Games_DownVoterId",
                        column: x => x.DownVoterId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Downvotes_Users_DownVoterId",
                        column: x => x.DownVoterId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Upvotes",
                columns: table => new
                {
                    UpVoterId = table.Column<int>(nullable: false),
                    GameId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Upvotes", x => new { x.UpVoterId, x.GameId });
                    table.ForeignKey(
                        name: "FK_Upvotes_Games_UpVoterId",
                        column: x => x.UpVoterId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Upvotes_Users_UpVoterId",
                        column: x => x.UpVoterId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Downvotes");

            migrationBuilder.DropTable(
                name: "Upvotes");
        }
    }
}
