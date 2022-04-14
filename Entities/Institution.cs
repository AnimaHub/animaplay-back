using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AnimaPlayBack.Entities
{
    public class Institution
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }

        [JsonIgnore]
        public virtual List<Student>? Students { get; set; }

        public virtual List<CourseInstitution>? CourseInstitution { get; set; }
    }
}
