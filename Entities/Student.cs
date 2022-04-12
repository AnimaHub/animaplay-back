using AnimaPlayBack.Models.Enumerators;
using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Entities
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }

        [MaxLength(11)]
        [Required]
        public int Ra { get; set; }
        
        [Required]
        public Course? Course { get; set; }
        public StudentType StudentType { get; set; }
    }
}
