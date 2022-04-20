using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Entities
{
    public class Address
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public int PartnerId { get; set; }
        public virtual Partner Partner { get; set; }
        public string Cep { get; set; }
        public string Street { get; set; }
        public string Neighborhood { get; set; }
        public string City { get; set; }
        public string State { get; set; }
    }
}
