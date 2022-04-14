using AnimaPlayBack.Models.Enumerators;
using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Dtos
{
    public class LoginDTO
    {
        public LoginDTO(string username, int phonenumber, string email, string password, string repassword, DateTime birthDate, UserTypeEnum userType)
        {
            this.UserName = username;
            this.PhoneNumber = phonenumber;
            this.Email = email;
            this.Password = password;
            this.RePassword = repassword;
            this.UserType = userType;
            this.BirthDate = birthDate;
        }

        [StringLength(50)]
        [Required(ErrorMessage = "Name is required")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Phone is required")]
        public int PhoneNumber { get; set; }

        [StringLength(70)]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
        [DataType(DataType.Password)]
        
        [Required]
        [Compare("Password")]
        public string RePassword { get; set; }

        [Required]
        public UserTypeEnum UserType { get; set; }

        public DateTime BirthDate { get; set; }
    }
}
