using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Entities
{
    public class CourseInstitution
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public int CourseId { get; set; }
        public virtual Course Course { get; set; }
        public int InstitutionId { get; set; }
        public virtual Institution Institution { get; set; }
    }
}
