﻿using AnimaPlayBack.Dtos;
using AnimaPlayBack.Services;
using Microsoft.AspNetCore.Http;
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
        [HttpPost]
        public IActionResult Enroll([FromBody] LoginDTO dto)
        {
            var result = this._service.Enroll(dto);
            if (result.IsFailed) return BadRequest(result.Errors);
            return Ok(result.Successes);
        }
    }
}