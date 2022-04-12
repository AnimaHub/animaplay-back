﻿using AnimaPlayBack.Dtos;
using AnimaPlayBack.Models.Requests;
using AnimaPlayBack.Services;
using Microsoft.AspNetCore.Mvc;

namespace AnimaPlayBack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private LoginService _service;

        public LoginController(LoginService service)
        {
            this._service = service;
        }

        [HttpPost]
        public IActionResult Login(LoginRequest request)
        {
            var result = this._service.Login(request);
            if (result.IsFailed) return Unauthorized(result.Errors);
            return Ok(result.Successes);
        }

    }
}