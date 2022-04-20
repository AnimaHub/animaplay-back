using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace AnimaPlayBack.Migrations
{
    public partial class CreateAddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cep",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "Neighborhood",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Partners");

            migrationBuilder.DropColumn(
                name: "Street",
                table: "Partners");

            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    PartnerId = table.Column<int>(type: "int", nullable: false),
                    Cep = table.Column<string>(type: "text", nullable: false),
                    Street = table.Column<string>(type: "text", nullable: false),
                    Neighborhood = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    State = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Address_Partners_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Address_PartnerId",
                table: "Address",
                column: "PartnerId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.AddColumn<string>(
                name: "Cep",
                table: "Partners",
                type: "text",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Partners",
                type: "text",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "Neighborhood",
                table: "Partners",
                type: "text",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Partners",
                type: "text",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "Street",
                table: "Partners",
                type: "text",
                nullable: false);

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
        }
    }
}
