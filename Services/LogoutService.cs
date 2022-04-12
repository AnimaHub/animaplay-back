using FluentResults;
using Microsoft.AspNetCore.Identity;

namespace AnimaPlayBack.Services
{
    public class LogoutService
    {
        private SignInManager<IdentityUser<int>> _signInManager;

        public LogoutService(SignInManager<IdentityUser<int>> signInManager)
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
