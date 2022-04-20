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
        [Required]
        public virtual CustomIdentityUser CustomIdentityUser { get; set; }
        public string Cep { get; set; }
        public string Street { get; set; }
        public string Neighborhood { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}
