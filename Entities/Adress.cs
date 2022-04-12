using AnimaPlayBack.Entities.Enumerator;

namespace AnimaPlayBack.Entities;

public class Adress
{
    public Adress(int cep, string street, string neighborhood, string city, State state)
    {
        Cep = cep;
        Street = street;
        Neighborhood = neighborhood;
        City = city;
        State = state;
    }

    public Adress()
    {
    }

    public int Cep { get; set; }
    public string Street { get; set; }
    public string Neighborhood { get; set; }
    public string City { get; set; }
    public State State { get; set; }
}