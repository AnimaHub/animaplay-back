using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AnimaPlayBack.Migrations
{
    public partial class addcustomuserstype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "AspNetUsers",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "9d0e390a-d628-47aa-b8f1-1e636cf9a59c");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "8a8c3f9b-3372-43b6-b59e-44ad9e9ee6a7");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "2e7dc899-b6d3-44d4-a9ee-e49a83dd3b7a");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "1e3cef9e-edb1-4a05-a2f2-26a7cb48e467");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 5,
                column: "ConcurrencyStamp",
                value: "8d3fdbc9-86c1-4bc3-975b-586c4eb3fce9");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d9c91d15-5e4d-40f5-b2f6-ab6f77908eb3", "AQAAAAEAACcQAAAAELUwclt7jU16DsMEcPS+KXur1WtS1GlJOZgrew90n6mrYosXziu8PBiD2M3PWK6k1Q==", "4287e303-9a6e-4acb-a494-5f425ab61246" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "8e6f124c-2631-4aad-bc78-5c11b91bd748");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "e9ee5dd4-2e99-4269-b67c-79dd272acf8a");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "30de56d0-973d-4084-b44e-578a6c1bdbd0");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "290e62e9-e763-4938-8910-6e2c9acff30b");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 5,
                column: "ConcurrencyStamp",
                value: "f3896a8f-e60b-4ef7-ae0a-983d768fab04");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fd8f0660-c78d-4390-b0c3-8cb264175a7e", "AQAAAAEAACcQAAAAEIhjePJlUkXLFg99iVjL82iLWfWqqlqKfPtPA03j4gcsPTKr7FDCchyYQWFhqnbRIA==", "79887b1d-436d-44ea-92ea-66d916cbbdd2" });
        }
    }
}
