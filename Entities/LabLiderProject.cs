using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Entities
{
    public class LabLiderProject
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public int LabLiderId { get; set; }
        public virtual LabLider LabLider { get; set; }
        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }
    }
}
