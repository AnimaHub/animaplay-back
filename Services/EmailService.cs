using AnimaPlayBack.Models;
using MailKit.Net.Smtp;
using MimeKit;

namespace AnimaPlayBack.Services
{
    public class EmailService
    {
        private IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            this._config = config;
        }
        public void SendEmail(string[] recivers, string subject, int userId, string activationCode)
        {
            var message = new Message(recivers, subject, userId, activationCode);
            var emailMessage = CreateEmailBody(message);
            Send(emailMessage);
        }

        private void Send(MimeMessage emailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(
                        this._config.GetValue<string>("EmailSettings:SmtpServer"),
                        this._config.GetValue<int>("EmailSettings:Port"),
                        true
                        );
                    client.AuthenticationMechanisms.Remove("XOUATH2");
                    client.Authenticate(
                        this._config.GetValue<string>("EmailSettings:From"),
                        this._config.GetValue<string>("EmailSettings:Password")
                        );

                    client.Send(emailMessage);
                }
                catch (Exception)
                {

                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }

        private MimeMessage CreateEmailBody(Message message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(
                this._config.GetValue<string>("EmailSettings:From")
                ));

            emailMessage.To.AddRange(message.Recivers);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text)
            {
                Text = message.Content
            };

            return emailMessage;
        }
    }
}
