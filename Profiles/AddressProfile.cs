using AnimaPlayBack.Dtos;
using AnimaPlayBack.Entities;
using AutoMapper;

namespace AnimaPlayBack.Profiles
{
    public class AddressProfile : Profile
    {
        public AddressProfile()
        {
            CreateMap<AddressDTO, Address>();
        }
    }
}
