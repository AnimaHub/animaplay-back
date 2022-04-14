using AnimaPlayBack.Dtos;
using AnimaPlayBack.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace AnimaPlayBack.Profiles
{
    public class LoginProfile : Profile
    {
        public LoginProfile()
        {
            CreateMap<LoginDTO, User>();
            CreateMap<User, IdentityUser<int>>();
            CreateMap<User, CustomIdentityUser>();
        }
    }
}
