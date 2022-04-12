using AnimaPlayBack.Dtos;
using AnimaPlayBack.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace AnimaPlayBack.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserDTO, User>();
            CreateMap<User, IdentityUser<int>>();
        }
    }
}
