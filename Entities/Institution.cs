using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Entities
{
    public class Institution
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }
    }
}
