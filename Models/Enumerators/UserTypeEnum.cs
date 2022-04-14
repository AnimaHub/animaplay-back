namespace AnimaPlayBack.Models.Enumerators
{
    public enum UserTypeEnum
    {
        STUDENT,
        ADVISOR,
        PARTNER,
        LABLIDER,
        ADMIN
    }
    public static class UserTypeExtensions
    {
        public static string getUserString(this UserTypeEnum typeEnum)
        {
            switch (typeEnum)
            {
                case UserTypeEnum.ADMIN:
                    return "admin";
                case UserTypeEnum.LABLIDER:
                    return "lablider";
                case UserTypeEnum.ADVISOR:
                    return "advisor";
                case UserTypeEnum.STUDENT:
                    return "student";
                case UserTypeEnum.PARTNER:
                    return "partner";
                default:
                    return "undefined";
            }
        }
    }

}

