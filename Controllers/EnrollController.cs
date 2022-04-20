using AnimaPlayBack.Dtos;
using AnimaPlayBack.Models.Enumerators;
using AnimaPlayBack.Models.Requests;
using AnimaPlayBack.Services;
using Microsoft.AspNetCore.Mvc;

namespace AnimaPlayBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollController : ControllerBase
    {
        private EnrollService _service;
        public EnrollController(EnrollService service)
        {
            this._service = service;
        }
        [HttpPost("Admin")]
        public IActionResult EnrollAdmin([FromBody] LoginDTO dto)
        {
            var result = this._service.Enroll(dto, UserTypeEnum.ADMIN);
            if (result.IsFailed) return BadRequest(result.Errors);
            return Ok(result.Successes);
        }

        [HttpPost("LabLider")]
        public IActionResult EnrollLabLider([FromBody] LabLiderDTO dto)
        {
            var result = this._service.Enroll(dto, UserTypeEnum.LABLIDER);
            if (result.IsFailed) return BadRequest(result.Errors);
            return Ok(result.Successes);
        }

        [HttpPost("Advisor")]
        public IActionResult EnrollAdvisor([FromBody] AdvisorDTO dto)
        {
            var result = this._service.Enroll(dto, UserTypeEnum.ADVISOR);
            if (result.IsFailed) return BadRequest(result.Errors);
            return Ok(result.Successes);
        }

        [HttpPost("Student")]
        public IActionResult EnrollStudent([FromBody] StudentDTO dto)
        {
            var result = this._service.Enroll(dto, UserTypeEnum.STUDENT);
            if (result.IsFailed) return BadRequest(result.Errors);
            return Ok(result.Successes);
        }

        [HttpPost("Partner")]
        public IActionResult EnrollPartner([FromBody] PartnerDTO dto)
        {
            var result = this._service.Enroll(dto, UserTypeEnum.PARTNER);
            if (result.IsFailed) return BadRequest(result.Errors);
            return Ok(result.Successes);
        }

        [HttpPost("Activate")]
        public IActionResult ActivateUserAccount([FromBody] ActivateAccountRequest request)
        {
            var result = this._service.ActivateUser(request);
            if (result.IsFailed) return StatusCode(500, result.Errors);
            return Ok(result.Successes);
        }

        [HttpGet("Activate")]
        public IActionResult ActivateUserAccountByEmail([FromQuery] ActivateAccountRequest request)
        {
            var result = this._service.ActivateUser(request);
            if (result.IsFailed) return StatusCode(500, result.Errors);
            return Ok(result.Successes);
        }
    }
}
