using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Entities
{
    public class LabLider
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public int CustomIdentityUserId { get; set; }
        [Required]
        public virtual CustomIdentityUser CustomIdentityUser { get; set; }
        [Required]
        public int InstitutionId { get; set; }
        public virtual Institution Institution { get; set; }
        [Required]
        public int CourseId { get; set; }
        public virtual Course Course { get; set; }
    }
}
