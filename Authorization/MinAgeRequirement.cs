using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace AnimaPlayBack.Authorization
{
    public class MinAgeRequirement : IAuthorizationRequirement
    {
        public MinAgeRequirement(int minAge)
        {
            MinAge = minAge;
        }

        public int MinAge { get; set; }
    }

    // How to use: 
    // [Authorize(Roles = "admin, regular", Policy = "MinAge")]
    public class MinAgeHandler : AuthorizationHandler<MinAgeRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MinAgeRequirement requirement)
        {
            if (!context.User.HasClaim(c => c.Type == ClaimTypes.DateOfBirth))
                return Task.CompletedTask;

            DateTime birthDate = Convert.ToDateTime(context.User.FindFirst(c =>
                c.Type == ClaimTypes.DateOfBirth
            ).Value);

            int retrivedAge = DateTime.Today.Year - birthDate.Year;

            if (birthDate > DateTime.Today.AddYears(-retrivedAge))
                retrivedAge--;

            if (retrivedAge >= requirement.MinAge) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
