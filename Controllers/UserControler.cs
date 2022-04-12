using AnimaPlayBack.Data;
using AnimaPlayBack.Dto;
using AnimaPlayBack.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AnimaPlayBack.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private UserContext _context;

    public UserController(UserContext context)
    {
        this._context = context;
    }

    [HttpPost(Name = "AddUsers")]
    public IActionResult AddUser([FromBody] UserDTO userDTO)
    {
        var user = new User() 
        {
            Email = userDTO.Email,
            Name = userDTO.Name,
            Password = userDTO.Password,
            Phone = userDTO.Phone
        };

        this._context.Users.Add(user);
        return CreatedAtAction(nameof(GetUserById), new {Id = user.Id} , user);
    }

    [HttpGet]
    public IActionResult ListUser()
    {
        return Ok(this._context.Users);
    }

    [HttpGet("{id}")]
    public IActionResult GetUserById(int id)
    {
        var user = this._context.Users.FirstOrDefault(x => x.Id == id);
        if (user != null)
        {
            return Ok(user);
        }

        return NotFound();
    }

    [HttpPut("{id}")]
    public IActionResult UpdateUser(int id)
    {
       // var user = conte
       return Ok();
    }
}