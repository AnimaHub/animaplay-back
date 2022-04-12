using AnimaPlayBack.Entities.Enumerator;

namespace AnimaPlayBack.Entities;

public abstract class UserType
{
    public int UserTypeId { get; set; }
    public UserTypeEnum Type { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }
}