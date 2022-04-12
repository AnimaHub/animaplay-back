using AnimaPlayBack.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AnimaPlayBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogoutController : ControllerBase
    {
        private LogoutService _logoutService;

        public LogoutController(LogoutService logoutService)
        {
            _logoutService = logoutService;
        }

        [HttpPost]
        public IActionResult Logout()
        {
            var result = this._logoutService.Logout();

            if (result.IsFailed) return NotFound(result.Errors);

            return Ok(result.Successes);
        }
    }
}
