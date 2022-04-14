using AnimaPlayBack.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AnimaPlayBack.Data
{
    public class UserContext : IdentityDbContext<CustomIdentityUser, IdentityRole<int>, int>
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            var hasher = new PasswordHasher<CustomIdentityUser>();
            var admin = new CustomIdentityUser()
            {
                UserName = "admin",
                NormalizedUserName = "ADMIN",
                Email = "admin@admin.com",
                NormalizedEmail = "ADMIN@ADMIN.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                Id = 1
            };

            admin.PasswordHash = hasher.HashPassword(admin, "Admin123456!");

            builder.Entity<CustomIdentityUser>().HasData(admin);

            builder.Entity<IdentityRole<int>>().HasData(
                new IdentityRole<int> { Id = 1, Name = "admin", NormalizedName = "ADMIN" }
                );

            builder.Entity<IdentityRole<int>>().HasData(
                new IdentityRole<int> { Id = 2, Name = "lablider", NormalizedName = "LABLIDER" }
                );

            builder.Entity<IdentityRole<int>>().HasData(
                new IdentityRole<int> { Id = 3, Name = "advisor", NormalizedName = "ADVISOR" }
                );

            builder.Entity<IdentityRole<int>>().HasData(
                new IdentityRole<int> { Id = 4, Name = "student", NormalizedName = "STUDENT" }
                );

            builder.Entity<IdentityRole<int>>().HasData(
                new IdentityRole<int> { Id = 5, Name = "partner", NormalizedName = "PARTNER" }
                );

            builder.Entity<IdentityUserRole<int>>().HasData(
                new IdentityUserRole<int> { RoleId = 1, UserId = 1}
                );
        }
    }
}
