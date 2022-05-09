using AnimaPlayBack.Dtos;
using AnimaPlayBack.Entities;
using AutoMapper;

namespace AnimaPlayBack.Profiles
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            CreateMap<ProjectDTO, Project>();
            CreateMap<Project, ProjectDTO>();
        }
    }
}
