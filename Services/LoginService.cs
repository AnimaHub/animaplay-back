using AnimaPlayBack.Dtos;
using AnimaPlayBack.Entities;
using AnimaPlayBack.Models.Requests;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Identity;

namespace AnimaPlayBack.Services
{
    public class LoginService
    {
        private SignInManager<IdentityUser<int>> _signInManager;
        private TokenService _tokenService;

        public LoginService(SignInManager<IdentityUser<int>> signInManager, TokenService tokenService)
        {
            this._signInManager = signInManager;
            this._tokenService = tokenService;
        }

        public Result Login(LoginRequest request)
        {
            var identityResult = this
                ._signInManager.PasswordSignInAsync(request.Username, request.Password, false, false);
            
            if (identityResult.Result.Succeeded)
            {
                var identityUser = this._signInManager
                    .UserManager.Users.FirstOrDefault(user =>
                    user.NormalizedUserName == request.Username.ToUpper());

                var token = this._tokenService.CreateToken(identityUser);
                return Result.Ok().WithSuccess(token.Value);
            }

            return Result.Fail("Login failed");
        }
    }
}
