using AnimaPlayBack.Entities;
using AnimaPlayBack.Models.Enumerators;

namespace AnimaPlayBack.Models
{
    public class UserType
    {
        public int UserTypeId { get; set; }
        public UserTypeEnum Type { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
