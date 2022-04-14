using AnimaPlayBack.Entities;
using FluentResults;
using Microsoft.AspNetCore.Identity;

namespace AnimaPlayBack.Services
{
    public class LogoutService
    {
        private SignInManager<CustomIdentityUser> _signInManager;

        public LogoutService(SignInManager<CustomIdentityUser> signInManager)
        {
            this._signInManager = signInManager;
        }
        internal Result Logout()
        {
            var identityResult = this._signInManager.SignOutAsync();

            if (identityResult.IsCompleted) return Result.Ok();
            return Result.Fail("Logout failed");
        }
    }
}
