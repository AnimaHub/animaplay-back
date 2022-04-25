using AnimaPlayBack.Dtos;
using AnimaPlayBack.Entities;
using AutoMapper;

namespace AnimaPlayBack.Profiles
{
    public class LabLiderProfile : Profile
    {
        public LabLiderProfile()
        {
            CreateMap<LabLiderDTO, LabLider>();
        }
    }
}
