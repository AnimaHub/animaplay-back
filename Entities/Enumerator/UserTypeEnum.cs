namespace AnimaPlayBack.Entities.Enumerator;

public enum UserTypeEnum
{
    ADMIN,
    LIDERLAB,
    ORIENTADOR,
    ALUNO,
    PARCEIRO
}

public static class UserTypeExtensions
{
    public static string getUserString(this UserTypeEnum typeEnum)
    {
        switch (typeEnum)
        {
            case UserTypeEnum.ADMIN:
                return "Administrador";
            case UserTypeEnum.LIDERLAB:
                return "Líder de Laboratório";
            case UserTypeEnum.ORIENTADOR:
                return "Orientador";
            case UserTypeEnum.ALUNO:
                return "Aluno";
            case UserTypeEnum.PARCEIRO:
                return "Parceiro";
            default:
                return "";
        }
    }
}