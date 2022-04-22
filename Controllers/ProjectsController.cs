using AnimaPlayBack.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;

namespace AnimaPlayBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        #region Consultar Projetos
        [HttpGet]
        public async Task<ActionResult<string>> Get()
        {
            string response = "";
            string query = string.Format("SELECT IDProjeto, ID_LabLider, Img, Nome FROM Projetos");
            List<Projeto> projetos = new List<Projeto>();
            DataBase dataBase = new DataBase();            

            DataTable dados = dataBase.ConsultaQuery(query);
            if (dados.Rows.Count > 0)
            {
                foreach (DataRow row in dados.Rows)
                {
                    Projeto projeto = new Projeto();
                    projeto.IdProjeto = Convert.ToInt32(row[0]);
                    projeto.Id_LabLider = Convert.ToInt32(row[1]);
                    projeto.Img = row[2].ToString();
                    projeto.Nome = row[3].ToString();
                    projetos.Add(projeto);
                }
                response = JsonConvert.SerializeObject(projetos);
            }
            else
                response = "Nenhum registro encontrado.";

            return response;
        }
        #endregion

        #region Consultar Projeto
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Get(int id)
        {
            string response = "";
            string query = string.Format("SELECT IDProjeto, ID_LabLider, Img, Nome FROM Projetos WHERE IDProjeto = {0}", id);
            Projeto projeto = new Projeto();
            DataBase dataBase = new DataBase();

            DataTable dados = dataBase.ConsultaQuery(query);
            if (dados.Rows.Count > 0)
            {
                projeto.IdProjeto = Convert.ToInt32(dados.Rows[0][0]);
                projeto.Id_LabLider = Convert.ToInt32(dados.Rows[0][1]);
                projeto.Img = dados.Rows[0][2].ToString();
                projeto.Nome = dados.Rows[0][3].ToString();
                response = JsonConvert.SerializeObject(projeto);
            }

            return response;
        }
        #endregion

        #region Deletar Projeto
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin, lablider")]
        public async Task<ActionResult<string>> Delete(int id)
        {
            string response = "Projeto excluido com sucesso.";
            string query = string.Format("SELECT * FROM Projetos WHERE IDProjeto = {0}", id);
            DataBase database = new DataBase();
            DataTable dados = database.ConsultaQuery(query);
            if (dados.Rows.Count == 0)
                response = "Projeto não encontrado.";
            else
            {
                query = string.Format("DELETE FROM Projetos WHERE IDProjeto = {0};", id);
                if (!database.ExecutarQuery(query))
                    response = "Erro ao excluir projeto.";
            }

            return response;
        }
        #endregion

        #region Publicar Projeto
        [HttpPost]
        [Authorize(Roles = "admin, lablider")]
        public async Task<ActionResult<string>> Publicar([FromBody] Projeto projeto)
        {
            string response = "Projeto cadastrado com sucesso.";
            DataBase database = new DataBase();

            string query = string.Format("SELECT IDProjeto, ID_LabLider, Img, Nome FROM Projetos WHERE Nome = '{0}'", projeto.Nome);

            DataTable dados = database.ConsultaQuery(query);

            if (dados.Rows.Count > 0)
                return "Projeto já cadastrado no sistema.";
            else
            {
                query = string.Format(@"SELECT ID_LabLider, Nome, Institution FROM LabLider Where ID_LabLider = {0}", projeto.Id_LabLider);
                dados = database.ConsultaQuery(query);

                if (dados.Rows.Count > 0)
                {
                    query = string.Format(@"Insert Into Projetos(ID_LabLider, Img, Nome)
                                            values({0}, '{1}', '{2}') ", projeto.Id_LabLider, projeto.Img, projeto.Nome);
                    if (!database.ExecutarQuery(query))
                        response = "Erro ao cadastrar projeto no sistema.";
                }
                else
                    response = "Lider não encontrado no sistema.";
            }
            return response;
        }
        #endregion

        #region Modelo de metodos
        //[HttpPost("test")]
        //[Authorize(Roles = "admin")]
        //public IActionResult Test()
        //{
        //    return Ok("It works");
        //}

        //[HttpGet]
        //[Authorize(Roles = "admin, student")]
        //public async Task<ActionResult<IEnumerable<string>>> Get()
        //{
        //    return Ok(_projects);
        //}

        //[HttpGet("{id}")]
        //public async Task<ActionResult<string>> Get(int id)
        //{
        //    var result = _projects[id] != null ? _projects[id] : "Not found";
        //    return Ok(result);
        //}

        //[HttpPost]
        //public async Task<ActionResult<string>> Post([FromBody] string value)
        //{
        //    _projects.Add(value);
        //    return Ok("Add with success");
        //}

        //[HttpPut]
        //public async Task<ActionResult<string>> Put([FromQuery] int id, [FromBody] string value)
        //{
        //    var result = $"{value}, {id}";
        //    return Ok(result);
        //}

        //[HttpDelete]
        //public async Task<ActionResult<List<string>>> Delete([FromQuery] int id)
        //{
        //    var remove = _projects[id];
        //    _projects.Remove(remove);
        //    return Ok(_projects);
        //}
        #endregion
    }
}
