using System.ComponentModel.DataAnnotations;
using AnimaPlayBack.Entities;
using AnimaPlayBack.Entities.Enumerator;

namespace AnimaPlayBack.Dto;

public class UserDTO
{
    public long Id { get; set; }
    [StringLength(50)]
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; }
    
    [StringLength(70)]
    [Required(ErrorMessage = "Email is required")]
    public string Email { get; set; }
    
    [StringLength(20)]
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }
    public int Phone { get; set; } = 0;
    public string Photo { get; set; } = "default.png";
    public UserTypeEnum UserTypeEnum { get; set; } = UserTypeEnum.ALUNO;
    public int Ra { get; set; } = 0;
    public Course Course { get; set; } = Course.ENGENHARIA_COMPUTAÇÃO;
    public Institution Instituition { get; set; } = Institution.USJT;
    public StudentType StudentType { get; set; } = StudentType.ACTIVE;
    public string Company { get; set; } = "";
    public string Role { get; set; } = "";
    public Adress Adress { get; set; } = new Adress(1, "", "", "", State.SP);
}