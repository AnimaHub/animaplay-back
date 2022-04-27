using AnimaPlayBack.Entities;
using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Dtos
{
    public class ProjectDTO
    {
        [Required]
        public string? Name { get; set; }
        public string? Image { get; set; }
        public List<LabLiderProjectDTO>? LabLiders { get; set; }
        public List<AdvisorProjectDTO>? Advisors { get; set; }
    }
}
