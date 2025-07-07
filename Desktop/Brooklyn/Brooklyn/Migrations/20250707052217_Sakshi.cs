using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Brooklyn.Migrations
{
    public partial class Sakshi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QualityLogs_Models_ModelId",
                table: "QualityLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_QualityLogs_Users_UserId",
                table: "QualityLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_StandardCycleTimes_Models_ModelId",
                table: "StandardCycleTimes");

            migrationBuilder.AlterColumn<long>(
                name: "ModelId",
                table: "StandardCycleTimes",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<int>(
                name: "CycleTimeMinutes",
                table: "StandardCycleTimes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "QualityLogs",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartTime",
                table: "QualityLogs",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "QualityStatus",
                table: "QualityLogs",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "PartNumber",
                table: "QualityLogs",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<long>(
                name: "ModelId",
                table: "QualityLogs",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndTime",
                table: "QualityLogs",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Models",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddForeignKey(
                name: "FK_QualityLogs_Models_ModelId",
                table: "QualityLogs",
                column: "ModelId",
                principalTable: "Models",
                principalColumn: "ModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_QualityLogs_Users_UserId",
                table: "QualityLogs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_StandardCycleTimes_Models_ModelId",
                table: "StandardCycleTimes",
                column: "ModelId",
                principalTable: "Models",
                principalColumn: "ModelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QualityLogs_Models_ModelId",
                table: "QualityLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_QualityLogs_Users_UserId",
                table: "QualityLogs");

            migrationBuilder.DropForeignKey(
                name: "FK_StandardCycleTimes_Models_ModelId",
                table: "StandardCycleTimes");

            migrationBuilder.AlterColumn<long>(
                name: "ModelId",
                table: "StandardCycleTimes",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CycleTimeMinutes",
                table: "StandardCycleTimes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "QualityLogs",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartTime",
                table: "QualityLogs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "QualityStatus",
                table: "QualityLogs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PartNumber",
                table: "QualityLogs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "ModelId",
                table: "QualityLogs",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndTime",
                table: "QualityLogs",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Models",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_QualityLogs_Models_ModelId",
                table: "QualityLogs",
                column: "ModelId",
                principalTable: "Models",
                principalColumn: "ModelId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QualityLogs_Users_UserId",
                table: "QualityLogs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StandardCycleTimes_Models_ModelId",
                table: "StandardCycleTimes",
                column: "ModelId",
                principalTable: "Models",
                principalColumn: "ModelId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
