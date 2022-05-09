using AnimaPlayBack.Dtos;
using AnimaPlayBack.Entities;
using AutoMapper;

namespace AnimaPlayBack.Profiles
{
    public class AdvisorProfile : Profile
    {
        public AdvisorProfile()
        {
            CreateMap<AdvisorDTO, Advisor>();
        }
    }
}
