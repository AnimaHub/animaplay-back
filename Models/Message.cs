using MimeKit;

namespace AnimaPlayBack.Models
{
    public class Message
    {
        public Message(IEnumerable<string> recivers, string subject, int userId, string activationCode)
        {
            Recivers = new List<MailboxAddress>();
            Recivers.AddRange(recivers
                .Select(r => new MailboxAddress(r)));
            Subject = subject;
            Content = $"https://localhost:7011/api/enroll/activate?UserId={userId}&ActivationCode={activationCode}";
        }

        public List<MailboxAddress> Recivers { get; }
        public string Subject { get; }
        public string Content { get; set; }
    }
}
