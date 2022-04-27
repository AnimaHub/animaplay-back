using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AnimaPlayBack.Entities
{
    public class Project
    {
        [Key]
        public int Id { get; set; }

        [JsonIgnore]
        [NotMapped]
        public virtual List<ProjectLabLider>? ProjectsLabLiders { get; set; }
        
        [JsonIgnore]
        [NotMapped]
        public virtual List<ProjectAdvisor>? ProjectsAdvisors { get; set; }

        [StringLength(30)]
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }
        public string? Image { get; set; }
        
    }
}
