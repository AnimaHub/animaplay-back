using Microsoft.AspNetCore.Identity;

namespace AnimaPlayBack.Entities
{
    public class CustomIdentityUser : IdentityUser<int>
    {
        public DateTime BirthDate { get; set; }
    }
}
