using Microsoft.EntityFrameworkCore.Migrations;

namespace AnimaPlayBack.Migrations
{
    public partial class UpdatePartner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Address_Partners_PartnerId",
                table: "Address");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Address",
                table: "Address");

            migrationBuilder.RenameTable(
                name: "Address",
                newName: "Addresses");

            migrationBuilder.RenameIndex(
                name: "IX_Address_PartnerId",
                table: "Addresses",
                newName: "IX_Addresses_PartnerId");

            migrationBuilder.AddColumn<string>(
                name: "JobRole",
                table: "Partners",
                type: "text",
                nullable: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "030d9ab6-377d-4aa5-985b-67483855882d");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "33de58fd-9a35-40e7-90b3-3b2847f02c92");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "e9675c2b-5e76-41ab-9b4c-8b0cc07c1215");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "9d1a1194-09a9-4bd6-b7e6-e6e3091cdb37");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 5,
                column: "ConcurrencyStamp",
                value: "dacac7b4-dba3-465b-9f0a-4eb2904492cb");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e8010b73-61a1-4cfe-9868-fd4b8ea3d82c", "AQAAAAEAACcQAAAAEKhEVSbIePgtdjTjvvZ4d4UJU2B6uo0CPD+6WEL7Mfce2oKUvdSXUsJchBUxeEu3lg==", "c112adcb-d98a-4594-bc87-c8876b5c7c22" });

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Partners_PartnerId",
                table: "Addresses",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Partners_PartnerId",
                table: "Addresses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "JobRole",
                table: "Partners");

            migrationBuilder.RenameTable(
                name: "Addresses",
                newName: "Address");

            migrationBuilder.RenameIndex(
                name: "IX_Addresses_PartnerId",
                table: "Address",
                newName: "IX_Address_PartnerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Address",
                table: "Address",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "2a51fa47-5225-4500-b2cb-2b6b8e6768e1");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "dda921d8-5235-4842-a5cf-003e909c7c34");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "0b674d90-77a6-47ad-8645-ebd0cdfb67b3");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 4,
                column: "ConcurrencyStamp",
                value: "2e1bc2a0-33c0-4c16-8f0c-ebde42b6dfa5");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 5,
                column: "ConcurrencyStamp",
                value: "6ea3e885-38c2-4192-8ee6-3aa3c40c0cff");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "10418a38-3650-4780-a99f-2d08628ff03a", "AQAAAAEAACcQAAAAEHpyZf+gwM5eFPWAupe5UaHOUuoSOpxEN+vXvZFP8CyJSHxRHee7OfKXzmRRNhZaOw==", "1eeb8f0f-fae3-4954-b413-63adf15d730b" });

            migrationBuilder.AddForeignKey(
                name: "FK_Address_Partners_PartnerId",
                table: "Address",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
