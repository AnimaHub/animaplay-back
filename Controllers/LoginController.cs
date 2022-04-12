using AnimaPlayBack.Dtos;
using AnimaPlayBack.Models.Requests;
using AnimaPlayBack.Services;
using Microsoft.AspNetCore.Mvc;

namespace AnimaPlayBack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private LoginService _service;
        private LogoutService _logoutService;

        public LoginController(LoginService service, LogoutService logoutService)
        {
            this._service = service;
            this._logoutService = logoutService;
        }

        [HttpPost]
        public IActionResult Login(LoginRequest request)
        {
            var result = this._service.Login(request);
            if (result.IsFailed) return Unauthorized(result.Errors);
            return Ok(result.Successes);
        }

        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            var result = this._logoutService.Logout();

            if (result.IsFailed) return NotFound(result.Errors);

            return Ok(result.Successes);
        }
    }
}
