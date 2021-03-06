using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Entities
{
    public class AdvisorProject
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public int AdvisorId { get; set; }
        public virtual Advisor Advisor { get; set; }
        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }
    }
}
