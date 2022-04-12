using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Entities;

public class User
{
    public User()
    {
    }

    [Key] 
    [Required] 
    public int Id { get; set; }

    [StringLength(50)]
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; }

    [MaxLength(13)]
    [Required(ErrorMessage = "Phone is required")]
    public int Phone { get; set; }

    [StringLength(70)]
    [Required(ErrorMessage = "Email is required")]
    public string Email { get; set; }

    [StringLength(20)]
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }
}