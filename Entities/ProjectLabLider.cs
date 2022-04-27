using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Entities
{
    public class ProjectLabLider
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }
        public int LabLiderId { get; set; }
        public virtual LabLider LabLider { get; set; }
    }
}
