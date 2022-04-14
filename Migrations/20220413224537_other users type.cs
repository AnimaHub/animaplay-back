using Microsoft.EntityFrameworkCore.Migrations;

namespace AnimaPlayBack.Migrations
{
    public partial class otheruserstype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "8e6f124c-2631-4aad-bc78-5c11b91bd748");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { 2, "e9ee5dd4-2e99-4269-b67c-79dd272acf8a", "lablider", "LABLIDER" },
                    { 3, "30de56d0-973d-4084-b44e-578a6c1bdbd0", "advisor", "ADVISOR" },
                    { 4, "290e62e9-e763-4938-8910-6e2c9acff30b", "student", "STUDENT" },
                    { 5, "f3896a8f-e60b-4ef7-ae0a-983d768fab04", "partner", "PARTNER" }
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fd8f0660-c78d-4390-b0c3-8cb264175a7e", "AQAAAAEAACcQAAAAEIhjePJlUkXLFg99iVjL82iLWfWqqlqKfPtPA03j4gcsPTKr7FDCchyYQWFhqnbRIA==", "79887b1d-436d-44ea-92ea-66d916cbbdd2" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "165a991b-bec1-4dee-844e-c5eeecd9b21d");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e4c7852e-03bd-4cda-a9f2-d525f5d72333", "AQAAAAEAACcQAAAAEBMVny/Hff4VaTGNM3paupEBG1cmRcQouZsy/XlcFjDtSVUgvDCa+CwtJ0l67o1EvQ==", "0dff14af-f2cf-4f9f-b886-ee324f9a64cc" });
        }
    }
}
