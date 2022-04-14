using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace AnimaPlayBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private static List<string> _projects = new List<string>() { "value1", "value2" };

        [HttpGet]
        [Authorize(Roles = "admin, student")]
        public async Task<ActionResult<IEnumerable<string>>> Get()
        {
            return Ok(_projects);
        }

        [HttpPost("test")]
        [Authorize(Roles = "admin")]
        public IActionResult Test()
        {
            return Ok("It works");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Get(int id)
        {
            var result = _projects[id] != null ? _projects[id] : "Not found";
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<string>> Post([FromBody] string value)
        {
            _projects.Add(value);
            return Ok("Add with success");
        }

        [HttpPut]
        public async Task<ActionResult<string>> Put([FromQuery] int id, [FromBody] string value)
        {
            var result = $"{value}, {id}";
            return Ok(result);
        }

        [HttpDelete]
        public async Task<ActionResult<List<string>>> Delete([FromQuery] int id)
        {
            var remove = _projects[id];
            _projects.Remove(remove);
            return Ok(_projects);
        }
    }
}
