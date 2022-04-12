using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Entities
{
    public class User
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [StringLength(50)]
        [Required(ErrorMessage = "Name is required")]
        public string? UserName { get; set; }

        [Required(ErrorMessage = "Phone is required")]
        public int PhoneNumber { get; set; }

        [StringLength(70)]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [StringLength(20)]
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }

        public virtual Student? Student { get; set; }
    }
}
