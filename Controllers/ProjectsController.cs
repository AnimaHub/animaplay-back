using AnimaPlayBack.Dtos;
using AnimaPlayBack.Services;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
//using Newtonsoft.Json;

namespace AnimaPlayBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private ProjectService _service;

        public ProjectsController(ProjectService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<ProjectDTO> Get([FromQuery] string projectName)
        {
            var projectDTO = _service.GetProjectByName(projectName);
            if (projectDTO.Name == null)
                return BadRequest(projectDTO);
            return Ok(projectDTO);
        }

        [HttpGet("All")]
        [Authorize(Roles = "admin, advisor, lablider")]
        public async Task<ActionResult<List<ProjectDTO>>> GetAll()
        {
            var projects = this._service.GetProjects();
            return Ok(projects);
        }

        [HttpPost]
        [Authorize(Roles = "admin, advisor, lablider")]
        public async Task<ActionResult<Result>> Post([FromBody] ProjectDTO dto)
        {
            var result = this._service.AddProject(dto);
            if (result.IsFailed)
                return BadRequest(result.Errors);
            return Ok(result.Successes);
        }

        [HttpPut]
        [Authorize(Roles = "admin, advisor, lablider")]
        public async Task<ActionResult<Result>> Put([FromBody] ProjectDTO dto)
        {
            var result = this._service.UpdateProject(dto);
            if (result.IsFailed)
                return BadRequest(result.Errors);
            return Ok(result.Successes);
        }

        [HttpDelete]
        [Authorize(Roles = "admin, advisor, lablider")]
        public async Task<ActionResult<Result>> Delete([FromQuery] string projectName)
        {
            var result = this._service.DeleteProject(projectName);
            if (result.IsFailed)
                return BadRequest(result.Errors);
            return Ok(result.Successes);
        }
    }
}
