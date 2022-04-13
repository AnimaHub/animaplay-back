using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Models.Requests
{
    public class ResetPasswordRequest
    {
        public ResetPasswordRequest(string email)
        {
            Email = email;
        }

        [Required]
        public string Email { get; set; }
    }
}
