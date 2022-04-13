using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Models.Requests
{
    public class ResetRequest
    {
        public ResetRequest(string password, string rePassword, string email, string token = null)
        {
            Password = password;
            RePassword = rePassword;
            Email = email;
            Token = token;
        }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [Compare("Password")]
        public string RePassword { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Token { get; set; }
    }
}
