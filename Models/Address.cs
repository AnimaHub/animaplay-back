using AnimaPlayBack.Models.Enumerators;

namespace AnimaPlayBack.Models
{
    public class Address
    {
        public Address(int cep, string street, string neighborhood, string city, State state)
        {
            Cep = cep;
            Street = street;
            Neighborhood = neighborhood;
            City = city;
            State = state;
        }

        public Address()
        {
        }

        public int Cep { get; set; }
        public string? Street { get; set; }
        public string? Neighborhood { get; set; }
        public string? City { get; set; }
        public State? State { get; set; }
    }
}
