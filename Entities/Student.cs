using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Entities
{
    public class Student
    {
        [Key]
        [Required]
        public int Id { get; set; }

        public int CustomIdentityUserId { get; set; }
        [Required]
        public virtual CustomIdentityUser CustomIdentityUser { get; set; }

        [Required]
        public int Ra { get; set; }

        [Required]
        public int InstitutionId { get; set; }
        [Required]
        public virtual Institution Institution { get; set; }

        public int CourseId { get; set; }
        public virtual Course Course { get; set; }
        
        [Required]
        public string StudentType { get; set; }
    }
}
