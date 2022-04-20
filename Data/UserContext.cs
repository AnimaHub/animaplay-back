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
                new IdentityUserRole<int> { RoleId = 1, UserId = 1 }
                );

            builder.Entity<Student>()
                .HasOne(s => s.CustomIdentityUser)
                .WithOne(ciu => ciu.Student)
                .HasForeignKey<Student>(s => s.CustomIdentityUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Student>()
                .HasOne(s => s.Institution)
                .WithMany(i => i.Students)
                .HasForeignKey(s => s.InstitutionId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Student>()
                .HasOne(s => s.Course)
                .WithMany(c => c.Students)
                .HasForeignKey(s => s.CourseId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Advisor>()
                .HasOne(a => a.CustomIdentityUser)
                .WithOne(ciu => ciu.Advisor)
                .HasForeignKey<Advisor>(a => a.CustomIdentityUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Advisor>()
                .HasOne(a => a.Institution)
                .WithMany(i => i.Advisors)
                .HasForeignKey(a => a.InstitutionId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Advisor>()
                .HasOne(a => a.Course)
                .WithMany(c => c.Advisors)
                .HasForeignKey(a => a.CourseId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<LabLider>()
                .HasOne(ll => ll.CustomIdentityUser)
                .WithOne(ciu => ciu.LabLider)
                .HasForeignKey<LabLider>(ll => ll.CustomIdentityUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<LabLider>()
                .HasOne(ll => ll.Institution)
                .WithMany(i => i.LabLiders)
                .HasForeignKey(ll => ll.InstitutionId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<LabLider>()
                .HasOne(ll => ll.Course)
                .WithMany(c => c.LabLiders)
                .HasForeignKey(ll => ll.CourseId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<CourseInstitution>()
                .HasOne(ci => ci.Course)
                .WithMany(c => c.CourseInstitution)
                .HasForeignKey(ci => ci.CourseId);

            builder.Entity<CourseInstitution>()
                .HasOne(ci => ci.Institution)
                .WithMany(i => i.CourseInstitution)
                .HasForeignKey(ci => ci.InstitutionId);

            builder.Entity<Partner>()
                .HasOne(p => p.CustomIdentityUser)
                .WithOne(ciu => ciu.Partner)
                .HasForeignKey<Partner>(p => p.CustomIdentityUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Address>()
                .HasOne(a => a.Partner)
                .WithOne(p => p.Address)
                .HasForeignKey<Address>(a => a.PartnerId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Advisor> Advisors { get; set; }
        public DbSet<LabLider> LabLiders { get; set; }
        public DbSet<Partner> Partners { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Institution> Institutions { get; set; }
        public DbSet<CourseInstitution> CourseInstitution { get; set; }
    }
}
