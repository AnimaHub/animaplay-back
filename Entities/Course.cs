using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
        public string Name { get; set; }

        [JsonIgnore]
        public virtual List<Student>? Students { get; set; }

        public virtual List<CourseInstitution>? CourseInstitution { get; set; }

    }
}
