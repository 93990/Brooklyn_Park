using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Brooklyn.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "Users",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<long>(
                name: "ModelId",
                table: "StandardCycleTimes",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "StandardCycleTimeId",
                table: "StandardCycleTimes",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<long>(
                name: "ShiftId",
                table: "Shifts",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "QualityLogs",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "ModelId",
                table: "QualityLogs",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "QualityLogId",
                table: "QualityLogs",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<long>(
                name: "ModelId",
                table: "Models",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<long>(
                name: "WorkAreaId",
                table: "MachineInformation",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "StationId",
                table: "MachineInformation",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "ModelId",
                table: "MachineInformation",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "MachineId",
                table: "MachineInformation",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
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

            migrationBuilder.AlterColumn<long>(
                name: "DowntimeTypeId",
                table: "DowntimeTypes",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<long>(
                name: "DowntimeTypeId",
                table: "DowntimeReasons",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "DowntimeReasonId",
                table: "DowntimeReasons",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "DowntimeLogs",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "ModelId",
                table: "DowntimeLogs",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "DowntimeTypeId",
                table: "DowntimeLogs",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "DowntimeReasonId",
                table: "DowntimeLogs",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "DowntimeLogId",
                table: "DowntimeLogs",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "ModelId",
                table: "StandardCycleTimes",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "StandardCycleTimeId",
                table: "StandardCycleTimes",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "ShiftId",
                table: "Shifts",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "QualityLogs",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "ModelId",
                table: "QualityLogs",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "QualityLogId",
                table: "QualityLogs",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "ModelId",
                table: "Models",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "WorkAreaId",
                table: "MachineInformation",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "StationId",
                table: "MachineInformation",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "ModelId",
                table: "MachineInformation",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "MachineId",
                table: "MachineInformation",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "DowntimeTypeId",
                table: "DowntimeTypes",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "DowntimeTypeId",
                table: "DowntimeReasons",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "DowntimeReasonId",
                table: "DowntimeReasons",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "DowntimeLogs",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "ModelId",
                table: "DowntimeLogs",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "DowntimeTypeId",
                table: "DowntimeLogs",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "DowntimeReasonId",
                table: "DowntimeLogs",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "DowntimeLogId",
                table: "DowntimeLogs",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
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
    }
}
