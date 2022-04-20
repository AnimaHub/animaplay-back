using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace AnimaPlayBack.Entities
{
    public class CustomIdentityUser : IdentityUser<int>
    {
        public DateTime BirthDate { get; set; }

        [JsonIgnore]
        public virtual Student? Student { get; set; }
        [JsonIgnore]
        public virtual Advisor? Advisor { get; set; }
        [JsonIgnore]
        public virtual LabLider? LabLider { get; set; }
        [JsonIgnore]
        public virtual Partner? Partner { get; internal set; }
    }
}
