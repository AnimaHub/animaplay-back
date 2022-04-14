using AnimaPlayBack.Entities;
using AnimaPlayBack.Models.Requests;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AnimaPlayBack.Services
{
    public class TokenService
    {
        private IConfiguration _config;
        public TokenService(IConfiguration config = null)
        {
            this._config = config;
        }
        public Token CreateToken(CustomIdentityUser user, string role)
        {
            var userRights = new Claim[] 
            {
                new Claim("username", user.UserName),
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Role, role)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8
                .GetBytes(this._config.GetValue<string>("AppSettings:Token"))
                );

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            
            var token = new JwtSecurityToken(
                claims: userRights,
                signingCredentials: credentials,
                expires: DateTime.UtcNow.AddHours(1)
                );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return new Token(tokenString);
        }
    }
}
