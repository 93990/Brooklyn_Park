using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Brooklyn.Migrations
{
    public partial class Create : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MachineInformation_Stations_StationId1",
                table: "MachineInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_MachineInformation_WorkAreas_WorkAreaId1",
                table: "MachineInformation");

            migrationBuilder.DropIndex(
                name: "IX_MachineInformation_StationId1",
                table: "MachineInformation");

            migrationBuilder.DropIndex(
                name: "IX_MachineInformation_WorkAreaId1",
                table: "MachineInformation");

            migrationBuilder.DropColumn(
                name: "StationId1",
                table: "MachineInformation");

            migrationBuilder.DropColumn(
                name: "WorkAreaId1",
                table: "MachineInformation");

            migrationBuilder.AlterColumn<long>(
                name: "WorkAreaId",
                table: "WorkAreas",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<long>(
                name: "StationId",
                table: "Stations",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.CreateIndex(
                name: "IX_MachineInformation_StationId",
                table: "MachineInformation",
                column: "StationId");

            migrationBuilder.CreateIndex(
                name: "IX_MachineInformation_WorkAreaId",
                table: "MachineInformation",
                column: "WorkAreaId");

            migrationBuilder.AddForeignKey(
                name: "FK_MachineInformation_Stations_StationId",
                table: "MachineInformation",
                column: "StationId",
                principalTable: "Stations",
                principalColumn: "StationId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MachineInformation_WorkAreas_WorkAreaId",
                table: "MachineInformation",
                column: "WorkAreaId",
                principalTable: "WorkAreas",
                principalColumn: "WorkAreaId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MachineInformation_Stations_StationId",
                table: "MachineInformation");

            migrationBuilder.DropForeignKey(
                name: "FK_MachineInformation_WorkAreas_WorkAreaId",
                table: "MachineInformation");

            migrationBuilder.DropIndex(
                name: "IX_MachineInformation_StationId",
                table: "MachineInformation");

            migrationBuilder.DropIndex(
                name: "IX_MachineInformation_WorkAreaId",
                table: "MachineInformation");

            migrationBuilder.AlterColumn<int>(
                name: "WorkAreaId",
                table: "WorkAreas",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "StationId",
                table: "Stations",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "StationId1",
                table: "MachineInformation",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WorkAreaId1",
                table: "MachineInformation",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MachineInformation_StationId1",
                table: "MachineInformation",
                column: "StationId1");

            migrationBuilder.CreateIndex(
                name: "IX_MachineInformation_WorkAreaId1",
                table: "MachineInformation",
                column: "WorkAreaId1");

            migrationBuilder.AddForeignKey(
                name: "FK_MachineInformation_Stations_StationId1",
                table: "MachineInformation",
                column: "StationId1",
                principalTable: "Stations",
                principalColumn: "StationId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MachineInformation_WorkAreas_WorkAreaId1",
                table: "MachineInformation",
                column: "WorkAreaId1",
                principalTable: "WorkAreas",
                principalColumn: "WorkAreaId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
