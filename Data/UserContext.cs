using AnimaPlayBack.Entities;
using Microsoft.EntityFrameworkCore;

namespace AnimaPlayBack.Data;

public class UserContext : DbContext
{
    public UserContext(DbContextOptions<UserContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
}