using AnimaPlayBack.Dtos;
using AnimaPlayBack.Entities;
using AutoMapper;

namespace AnimaPlayBack.Profiles
{
    public class CourseProfile : Profile
    {
        public CourseProfile()
        {
            CreateMap<CourseDTO, Course>();
        }
    }
}
