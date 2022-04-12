using AnimaPlayBack.Entities;
using Microsoft.EntityFrameworkCore;

namespace AnimaPlayBack.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //builder.Entity<User>()
            //    .HasOne(user => user.Student)
            //    .WithOne(student => student.User)
            //    .HasForeignKey<Student>(student => student.UserId);
                
        }
    }
}
