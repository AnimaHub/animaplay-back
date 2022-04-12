using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Entities
{
    public class Course
    {
        public Course(string name)
        {
            this.Name = name;
        }

        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }
    }
}
