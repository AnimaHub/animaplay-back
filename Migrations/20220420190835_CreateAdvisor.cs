using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace AnimaPlayBack.Migrations
{
    public partial class CreateAdvisor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Advisors",
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
                    table.PrimaryKey("PK_Advisors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Advisors_AspNetUsers_CustomIdentityUserId",
                        column: x => x.CustomIdentityUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Advisors_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Advisors_Institutions_InstitutionId",
                        column: x => x.InstitutionId,
                        principalTable: "Institutions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Advisors_CourseId",
                table: "Advisors",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Advisors_CustomIdentityUserId",
                table: "Advisors",
                column: "CustomIdentityUserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Advisors_InstitutionId",
                table: "Advisors",
                column: "InstitutionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Advisors");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "c2b8ae33-301d-46fc-94fd-3dfafe326ee2");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "f1633f68-b9a3-4bdf-94e1-6dfea0d51d1b");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "9efe170c-b4e0-4068-be12-b5d697c2d14c");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "9f5b0d2b-793c-496e-90a1-e6a27385c40d");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 5,
                column: "ConcurrencyStamp",
                value: "e2063046-1c13-48f6-b789-2214d5d4b734");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "421ce976-2d2f-4609-9166-7b803b0fa43e", "AQAAAAEAACcQAAAAEDz7RG4L5bhUkQXwPl/SgM4p1ciSA1gE7eW4nYDTLi1N4ezUgSDqPafE4cav6y8rLw==", "7098fed3-4fa5-4b4a-86be-c43f1f0c6811" });
        }
    }
}
