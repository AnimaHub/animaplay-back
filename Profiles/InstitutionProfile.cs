using AnimaPlayBack.Dtos;
using AnimaPlayBack.Entities;
using AutoMapper;

namespace AnimaPlayBack.Profiles
{
    public class InstitutionProfile : Profile
    {
        public InstitutionProfile()
        {
            CreateMap<InstitutionDTO, Institution>();
        }
    }
}
