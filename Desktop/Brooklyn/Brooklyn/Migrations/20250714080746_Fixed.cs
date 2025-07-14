using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Brooklyn.Migrations
{
    public partial class Fixed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reason",
                table: "DowntimeTypes");

            migrationBuilder.CreateTable(
                name: "DowntimeReasons",
                columns: table => new
                {
                    ReasonId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReasonText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DowntimeTypeID = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DowntimeReasons", x => x.ReasonId);
                    table.ForeignKey(
                        name: "FK_DowntimeReasons_DowntimeTypes_DowntimeTypeID",
                        column: x => x.DowntimeTypeID,
                        principalTable: "DowntimeTypes",
                        principalColumn: "DowntimeTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DowntimeReasons_DowntimeTypeID",
                table: "DowntimeReasons",
                column: "DowntimeTypeID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DowntimeReasons");

            migrationBuilder.AddColumn<string>(
                name: "Reason",
                table: "DowntimeTypes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
