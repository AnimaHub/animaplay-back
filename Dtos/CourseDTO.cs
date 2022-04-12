using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Dtos
{
    public class CourseDTO
    {
        [StringLength(100)]
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }
    }
}
