using MySql.Data;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using System.Configuration;
using System.Data;

namespace AnimaPlayBack.Controllers
{
    public class DataBase
    {
        private string connectionString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("ConnectionStrings")["AnimaConnectionLocal"];
        private MySqlConnection connection;

        public DataBase()
        {
            connection = new MySqlConnection(connectionString);
        }

        public bool ExecutarQuery(string query)
        {
            MySqlCommand command = connection.CreateCommand();

            try
            {
                connection.Open();
                command.CommandText = query;
                command.ExecuteNonQuery();
                return true;
            }
            catch (MySqlException ex)
            {
                string message = string.Empty;

                switch (ex.Number)
                {
                    case 2627:
                        message = "Registro já incluido na base de dados.";
                        break;
                    default:
                        break;
                }
                throw new Exception(message);
                return false;
            }
            finally
            {
                if(connection.State == ConnectionState.Open)
                    connection.Close();
            }
        }

        public DataTable ConsultaQuery(string query)
        {
            MySqlDataReader dados = null;
            DataTable table = new DataTable();
            
            try
            {
                connection.Open();
                MySqlCommand command = connection.CreateCommand();
                command.CommandText = query;
                dados = command.ExecuteReader();

                if(dados.HasRows)
                {
                    table.Load(dados);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }

            return table;
        }
    }
}
