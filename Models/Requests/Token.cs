namespace AnimaPlayBack.Models.Requests
{
    public class Token
    {
        public Token(string value)
        {
            this.Value = value;
        }
        public string Value { get; }
    }
}
