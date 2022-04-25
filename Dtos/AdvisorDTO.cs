using AnimaPlayBack.Models.Enumerators;
using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Dtos
{
    public class AdvisorDTO : LoginDTO
    {
        public AdvisorDTO(string username, int phonenumber, string email, string password, string repassword, DateTime birthDate, UserTypeEnum userType, InstitutionDTO institution, CourseDTO course) : 
            base(username, phonenumber, email, password, repassword, birthDate, userType)
        {
            Institution = institution;
            Course = course;
        }

        [Required]
        public InstitutionDTO Institution { get; set; }

        [Required]
        public CourseDTO Course { get; set; }
    }
}
