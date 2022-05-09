using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace AnimaPlayBack.Entities
{
    public class Project
    {
        public Project(string name)
        {
            this.AdvisorProject = new HashSet<AdvisorProject>();
            this.LabLiderProject = new HashSet<LabLiderProject>();
            this.Name = name;
        }

        [Key]
        public int Id { get; set; }
        [StringLength(40)]
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        public string? Image { get; set; }
        public virtual ICollection<AdvisorProject> AdvisorProject { get; set; }
        public virtual ICollection<LabLiderProject> LabLiderProject { get; set; }
    }
}
