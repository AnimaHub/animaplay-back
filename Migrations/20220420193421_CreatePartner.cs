using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace AnimaPlayBack.Migrations
{
    public partial class CreatePartner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LabLiders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    CustomIdentityUserId = table.Column<int>(type: "int", nullable: false),
                    InstitutionId = table.Column<int>(type: "int", nullable: false),
                    CourseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LabLiders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LabLiders_AspNetUsers_CustomIdentityUserId",
                        column: x => x.CustomIdentityUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LabLiders_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LabLiders_Institutions_InstitutionId",
                        column: x => x.InstitutionId,
                        principalTable: "Institutions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Partners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    CustomIdentityUserId = table.Column<int>(type: "int", nullable: false),
                    Cep = table.Column<string>(type: "text", nullable: false),
                    Street = table.Column<string>(type: "text", nullable: false),
                    Neighborhood = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    State = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partners", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Partners_AspNetUsers_CustomIdentityUserId",
                        column: x => x.CustomIdentityUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "195677f1-4478-4a8b-ba71-4ace2106c73e");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "5d4e973b-b8ad-4f07-a849-8f9b0f1d3edc");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "7ae8e1b7-5904-4ebc-bb8f-e6deca267e97");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "cad83173-8e0e-4389-a6e4-54142c4ae9a5");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 5,
                column: "ConcurrencyStamp",
                value: "d08208b4-d222-42ba-899f-73b15d105ac8");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e0fed8e2-08fc-4c7c-a740-e03cefe5ded5", "AQAAAAEAACcQAAAAEILWtmVaqcKidvYS69ytRUA28oqQ47gnp6Te98FRWA/LxmOIl9/mSMPb/TBmLy/DbQ==", "372663b3-5046-4a8b-bc4f-7205e28c3aeb" });

            migrationBuilder.CreateIndex(
                name: "IX_LabLiders_CourseId",
                table: "LabLiders",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_LabLiders_CustomIdentityUserId",
                table: "LabLiders",
                column: "CustomIdentityUserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LabLiders_InstitutionId",
                table: "LabLiders",
                column: "InstitutionId");

            migrationBuilder.CreateIndex(
                name: "IX_Partners_CustomIdentityUserId",
                table: "Partners",
                column: "CustomIdentityUserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LabLiders");

            migrationBuilder.DropTable(
                name: "Partners");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "6d3dbe5c-6987-4343-ac0c-4373829f05ee");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "660e4f93-ec3e-4383-a5a3-2aa8154862bb");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "07937a42-946a-4552-8441-11fb3046ae84");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "0bb14cbc-5fc7-4fd9-9578-501f851b360a");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 5,
                column: "ConcurrencyStamp",
                value: "2076e36b-c86a-4531-b4b9-bbab93a5c8b2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "0ab831c6-1dd5-4d6a-9de0-9d0de040a4ed", "AQAAAAEAACcQAAAAEH1X5XkDsToGzfx96tkOdgdB2mmvmQgY/KjbOFgbS/b29rA1YPJg0bh0dQ342bEaxA==", "fa1e0904-2423-429b-aebf-dba8fd0b9677" });
        }
    }
}
