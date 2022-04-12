using AnimaPlayBack.Data;
using AnimaPlayBack.Dtos;
using AnimaPlayBack.Entities;
using AnimaPlayBack.Models.Requests;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Identity;
using System.Web;

namespace AnimaPlayBack.Services
{
    public class EnrollService
    {
        private UserManager<IdentityUser<int>> _userManager;
        private IMapper _mapper;
        private UserContext _context;
        private EmailService _emailService;

        public EnrollService(UserManager<IdentityUser<int>> userManager, IMapper mapper, UserContext context, EmailService emailService)
        {
            this._userManager = userManager;
            this._mapper = mapper;
            this._context = context;
            this._emailService = emailService;
        }

        public Result Enroll(LoginDTO dto)
        {
            if (IsEmailOnTheDataBase(dto.Email)) 
            {
                return Result.Fail($"There is an account with the email: {dto.Email}");
            }

            var user = this._mapper.Map<User>(dto);
            var identityUser = this._mapper.Map<IdentityUser<int>>(user);
            var identityResult = this._userManager.CreateAsync(identityUser, dto.Password);

            if (identityResult.Result.Succeeded)
            {
                var activationCode = this._userManager
                    .GenerateEmailConfirmationTokenAsync(identityUser);

                var code = activationCode.Result;
                var encondedCode = HttpUtility.UrlEncode(code);

                this._emailService.SendEmail(
                    new [] {identityUser.Email},
                    "HUB ANIMA LAB - Link de Ativação",
                    identityUser.Id,
                    encondedCode
                    );

                return Result.Ok().WithSuccess(code) ;
            }
            return Result.Fail("Fail enrolling an user");
        }

        public Result ActivateUser(ActivateAccountRequest request)
        {
            var identityUser = this._userManager
                .Users
                .FirstOrDefault(u => u.Id == request.UserId);

            if (identityUser == null)
            {
                return Result.Fail($"No user found with the id: {request.UserId}");
            }

            var identityResult = this._userManager
                .ConfirmEmailAsync(identityUser, request.ActivationCode);

            if (identityResult.Result.Succeeded)
            {
                return Result.Ok();
            }

            return Result.Fail("Fail activating user account");
        }

        private bool IsEmailOnTheDataBase(string email)
        {
            var user = this._context.Users.FirstOrDefault(x => x.NormalizedEmail == email.ToUpper());

            if (user == null || !(user.EmailConfirmed)) return false;
            return true;
        }
    }
}
