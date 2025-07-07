using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Brooklyn.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DowntimeTypes",
                columns: table => new
                {
                    DowntimeTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DowntimeTypes", x => x.DowntimeTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Models",
                columns: table => new
                {
                    ModelId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Models", x => x.ModelId);
                });

            migrationBuilder.CreateTable(
                name: "Shifts",
                columns: table => new
                {
                    ShiftId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShiftName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shifts", x => x.ShiftId);
                });

            migrationBuilder.CreateTable(
                name: "Stations",
                columns: table => new
                {
                    StationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stations", x => x.StationId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "WorkAreas",
                columns: table => new
                {
                    WorkAreaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkAreas", x => x.WorkAreaId);
                });

            migrationBuilder.CreateTable(
                name: "DowntimeReasons",
                columns: table => new
                {
                    DowntimeReasonId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DowntimeTypeId = table.Column<int>(type: "int", nullable: false),
                    ReasonText = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DowntimeReasons", x => x.DowntimeReasonId);
                    table.ForeignKey(
                        name: "FK_DowntimeReasons_DowntimeTypes_DowntimeTypeId",
                        column: x => x.DowntimeTypeId,
                        principalTable: "DowntimeTypes",
                        principalColumn: "DowntimeTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StandardCycleTimes",
                columns: table => new
                {
                    StandardCycleTimeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModelId = table.Column<int>(type: "int", nullable: false),
                    CycleTimeMinutes = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StandardCycleTimes", x => x.StandardCycleTimeId);
                    table.ForeignKey(
                        name: "FK_StandardCycleTimes_Models_ModelId",
                        column: x => x.ModelId,
                        principalTable: "Models",
                        principalColumn: "ModelId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QualityLogs",
                columns: table => new
                {
                    QualityLogId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModelId = table.Column<int>(type: "int", nullable: false),
                    PartNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    QualityStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QualityLogs", x => x.QualityLogId);
                    table.ForeignKey(
                        name: "FK_QualityLogs_Models_ModelId",
                        column: x => x.ModelId,
                        principalTable: "Models",
                        principalColumn: "ModelId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QualityLogs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MachineInformation",
                columns: table => new
                {
                    MachineId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkAreaId = table.Column<int>(type: "int", nullable: false),
                    StationId = table.Column<int>(type: "int", nullable: false),
                    ModelId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MachineInformation", x => x.MachineId);
                    table.ForeignKey(
                        name: "FK_MachineInformation_Models_ModelId",
                        column: x => x.ModelId,
                        principalTable: "Models",
                        principalColumn: "ModelId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MachineInformation_Stations_StationId",
                        column: x => x.StationId,
                        principalTable: "Stations",
                        principalColumn: "StationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MachineInformation_WorkAreas_WorkAreaId",
                        column: x => x.WorkAreaId,
                        principalTable: "WorkAreas",
                        principalColumn: "WorkAreaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DowntimeLogs",
                columns: table => new
                {
                    DowntimeLogId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModelId = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DowntimeTypeId = table.Column<int>(type: "int", nullable: false),
                    DowntimeReasonId = table.Column<int>(type: "int", nullable: false),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DowntimeLogs", x => x.DowntimeLogId);
                    table.ForeignKey(
                        name: "FK_DowntimeLogs_DowntimeReasons_DowntimeReasonId",
                        column: x => x.DowntimeReasonId,
                        principalTable: "DowntimeReasons",
                        principalColumn: "DowntimeReasonId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DowntimeLogs_DowntimeTypes_DowntimeTypeId",
                        column: x => x.DowntimeTypeId,
                        principalTable: "DowntimeTypes",
                        principalColumn: "DowntimeTypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DowntimeLogs_Models_ModelId",
                        column: x => x.ModelId,
                        principalTable: "Models",
                        principalColumn: "ModelId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DowntimeLogs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DowntimeLogs_DowntimeReasonId",
                table: "DowntimeLogs",
                column: "DowntimeReasonId");

            migrationBuilder.CreateIndex(
                name: "IX_DowntimeLogs_DowntimeTypeId",
                table: "DowntimeLogs",
                column: "DowntimeTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DowntimeLogs_ModelId",
                table: "DowntimeLogs",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_DowntimeLogs_UserId",
                table: "DowntimeLogs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DowntimeReasons_DowntimeTypeId",
                table: "DowntimeReasons",
                column: "DowntimeTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_MachineInformation_ModelId",
                table: "MachineInformation",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_MachineInformation_StationId",
                table: "MachineInformation",
                column: "StationId");

            migrationBuilder.CreateIndex(
                name: "IX_MachineInformation_WorkAreaId",
                table: "MachineInformation",
                column: "WorkAreaId");

            migrationBuilder.CreateIndex(
                name: "IX_QualityLogs_ModelId",
                table: "QualityLogs",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_QualityLogs_UserId",
                table: "QualityLogs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_StandardCycleTimes_ModelId",
                table: "StandardCycleTimes",
                column: "ModelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DowntimeLogs");

            migrationBuilder.DropTable(
                name: "MachineInformation");

            migrationBuilder.DropTable(
                name: "QualityLogs");

            migrationBuilder.DropTable(
                name: "Shifts");

            migrationBuilder.DropTable(
                name: "StandardCycleTimes");

            migrationBuilder.DropTable(
                name: "DowntimeReasons");

            migrationBuilder.DropTable(
                name: "Stations");

            migrationBuilder.DropTable(
                name: "WorkAreas");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Models");

            migrationBuilder.DropTable(
                name: "DowntimeTypes");
        }
    }
}
