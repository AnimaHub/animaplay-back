using AnimaPlayBack.Models.Enumerators;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Entities
{
    public class Student
    {
        [MaxLength(11)]
        [Required]
        public int Ra { get; set; }

        [Required]
        public Course? Course { get; set; }
        public StudentType StudentType { get; set; }
    }
}
