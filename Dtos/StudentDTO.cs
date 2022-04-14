using AnimaPlayBack.Entities;
using AnimaPlayBack.Models.Enumerators;
using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Dtos
{
    public class StudentDTO : LoginDTO
    {
        public StudentDTO(string username, int phonenumber, string email, string password, string repassword, DateTime birthDate, UserTypeEnum userType, int ra, InstitutionDTO institution, CourseDTO course, string studentType) :
            base(username, phonenumber, email, password, repassword, birthDate, userType)
        {
            this.Ra = ra;
            this.StudentType = studentType;
            this.Institution = institution;
            this.Course = course;
        }

        [Required]
        public int Ra { get; set; }

        [Required]
        public  InstitutionDTO Institution { get; set; }

        [Required]
        public CourseDTO Course { get; set; }

        [Required]
        public string StudentType { get; set; }
    }
}
