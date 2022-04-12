using AnimaPlayBack.Data;
using AnimaPlayBack.Dtos;
using AnimaPlayBack.Entities;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Identity;

namespace AnimaPlayBack.Services
{
    public class EnrollService
    {
        private UserManager<IdentityUser<int>> _userManager;
        private IMapper _mapper;
        private UserContext _context;
        public EnrollService(UserManager<IdentityUser<int>> userManager, IMapper mapper, UserContext context)
        {
            this._userManager = userManager;
            this._mapper = mapper;
            _context = context;
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

            if (identityResult.Result.Succeeded) return Result.Ok();
            return Result.Fail("Fail enrolling an user");
        }

        private bool IsEmailOnTheDataBase(string email)
        {
            var user = this._context.Users.FirstOrDefault(x => x.NormalizedEmail == email.ToUpper());

            if (user == null) return false;
            return true;
        }
    }
}
