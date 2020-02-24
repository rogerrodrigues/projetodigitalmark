using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dm_api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace dm_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EnfermeiroController : ControllerBase
    {
        private readonly DataContext _context;
        public EnfermeiroController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Hospital/{id}")]
        public async Task<ActionResult<IEnumerable<EnfermeiroVM>>> GetByHospital(Guid id)
        {
            var retorno = _context.Enfermeiros.Where(e => e.HospitalId == id).Select(e => new EnfermeiroVM
            {
                Id = e.Id,
                Nome = e.Nome,
                HospitalId = e.HospitalId,
                COREN = e.COREN,
                CPF = e.CPF,
                DatetimeNascimento = e.DataNascimento
            }).ToList();

            foreach (var e in retorno)
            {
                e.DataNascimento = e.DatetimeNascimento.ToString("dd/MM/yyyy");
            }

            return retorno;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Enfermeiro>>> Get()
        {
            var retorno = _context.Enfermeiros.ToList();
            return retorno;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<EnfermeiroVM>> Get(Guid id)
        {
            var retorno = _context.Enfermeiros.Where(h => h.Id == id).Select(e => new EnfermeiroVM
            {
                Id = e.Id,
                Nome = e.Nome,
                HospitalId = e.HospitalId,
                COREN = e.COREN,
                CPF = e.CPF,
                DatetimeNascimento = e.DataNascimento
            }).FirstOrDefault();

            if(retorno!=null){
                retorno.DataNascimento = retorno.DatetimeNascimento.ToString("dd/MM/yyyy");
            }
            return Ok(retorno);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var enfermeiro = _context.Enfermeiros.SingleOrDefault(h => h.Id == id);
            _context.Enfermeiros.Remove(enfermeiro);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Enfermeiro>>> Post([FromBody] Enfermeiro model)
        {
            if (ModelState.IsValid)
            {
                _context.Enfermeiros.Add(model);
                _context.SaveChanges();

                return _context.Enfermeiros.ToList();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut]
        public async Task<ActionResult<IEnumerable<Enfermeiro>>> Put([FromBody] Enfermeiro model)
        {
            if (ModelState.IsValid)
            {
                var attached = _context.Attach(model);
                attached.State = EntityState.Modified;
                _context.SaveChanges();

                return _context.Enfermeiros.ToList();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
