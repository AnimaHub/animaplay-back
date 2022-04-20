using AnimaPlayBack.Models.Enumerators;
using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Entities
{
    public class Partner
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public int CustomIdentityUserId { get; set; }
        public string JobRole { get; set; }
        [Required]
        public virtual CustomIdentityUser CustomIdentityUser { get; set; }
        public virtual Address? Address { get; set; }
    }
}
