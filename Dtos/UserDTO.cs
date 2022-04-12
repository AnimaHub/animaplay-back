using AnimaPlayBack.Entities;
using AnimaPlayBack.Models;
using AnimaPlayBack.Models.Enumerators;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AnimaPlayBack.Dtos
{
    public class UserDTO
    {
        [StringLength(50)]
        [Required(ErrorMessage = "Name is required")]
        public string? Username { get; set; }

        [StringLength(70)]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [StringLength(20)]
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }

        [MaxLength(13)]
        [Required(ErrorMessage = "Phone is required")]
        public int Phone { get; set; }
        public int Ra { get; set; }
        public CourseDTO? Course { get; set; }
        public StudentType StudentType { get; set; }

        [JsonIgnore]
        public Address? Address { get; set; }
    }
}
