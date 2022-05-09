using AnimaPlayBack.Data;
using AnimaPlayBack.Dtos;
using AnimaPlayBack.Entities;
using AutoMapper;
using FluentResults;

namespace AnimaPlayBack.Services
{
    public class ProjectService
    {
        private UserContext _context;
        private IMapper _mapper;

        public ProjectService(UserContext context)
        {
            _context = context;
        }

        public ProjectDTO GetProjectByName(string projectName)
        {
            var projectDTO = new ProjectDTO();
            var project = this._context.Project.FirstOrDefault(p => p.Name == projectName);
            if(project != null)
                projectDTO = this._mapper.Map<ProjectDTO>(project);

            return projectDTO;
        }
        public List<ProjectDTO> GetProjects()
        {
            var projects = this._context.Project.ToList();

            var projectsDTO = new List<ProjectDTO>();

            foreach (var project in projects)
            {
                projectsDTO.Add(this._mapper.Map<ProjectDTO>(project));
            }
            return projectsDTO;
        }

        public Result UpdateProject(ProjectDTO dto)
        {
            var project = this._context.Project.FirstOrDefault(p => p.Name == dto.Name);
            if (project == null)
                return Result.Fail($"No project with this name: {dto.Name}");
            try
            {
                project.Name = dto.Name;
                project.Image = dto.Image;
                this._context.Project.Update(project);
                this._context.SaveChanges();
            }
            catch (Exception e)
            {
                return Result.Fail($"Error tring to update database: {e.Message}");
            }
            return Result.Ok().WithSuccess("Updated with success.");
        }

        public Result AddProject(ProjectDTO dto)
        {
            var project = this._mapper.Map<Project>(dto);
            try
            {
                if (dto.Advisors == null)
                {
                    throw new Exception("Advisors are null");
                }

                var projectAdvisors = new List<AdvisorProject>();
                var advisors = new List<Advisor>();
                foreach (var advisor in dto.Advisors)
                {
                    var dbAdvisor = this._context.Advisors.FirstOrDefault(a => a.CustomIdentityUser.NormalizedUserName == advisor.Name.ToUpper());
                    if (dbAdvisor != null)
                    {
                        var projectAdvisor = new AdvisorProject()
                        {
                            Advisor = dbAdvisor,
                            Project = project
                        };
                        projectAdvisors.Add(projectAdvisor);
                    }
                }
                this._context.Project.Add(project);
                this._context.SaveChanges();
            }
            catch (Exception e)
            {
                return Result.Fail($"Error tring to save on the database: {e.Message}");
            }
            return Result.Ok().WithSuccess("Add with success.");
        }

        public Result DeleteProject(string projectName)
        {
            var project = this._context.Project.FirstOrDefault(p => p.Name == projectName);
            if (project == null)
                return Result.Fail($"No project with this name: {projectName}");
            try
            {
                this._context.Project.Remove(project);
                this._context.SaveChanges();
            }
            catch (Exception e)
            {
                return Result.Fail($"Error tring to delete on the database: {e.Message}");
            }
            return Result.Ok().WithSuccess("Deleted with success.");
        }
    }
}
