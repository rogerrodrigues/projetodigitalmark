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
    public class HospitalController : ControllerBase
    {
        private readonly DataContext _context;
        public HospitalController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hospital>>> Get()
        {
            var retorno = _context.Hospitais.ToList();
            return retorno;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hospital>> Get(Guid id)
        {
            var retorno = _context.Hospitais.SingleOrDefault(h => h.Id == id);
            return retorno;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var hospital = _context.Hospitais.SingleOrDefault(h => h.Id == id);
            _context.Hospitais.Remove(hospital);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Hospital>>> Post([FromBody] Hospital model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Hospitais.Add(model);
                    _context.SaveChanges();

                    return _context.Hospitais.ToList();

                }
                catch (System.Exception e)
                {

                    throw;
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut]
        public async Task<ActionResult<IEnumerable<Hospital>>> Put([FromBody] Hospital model)
        {
            if (ModelState.IsValid)
            {
                var attached = _context.Attach(model);
                attached.State = EntityState.Modified;
                _context.SaveChanges();

                return _context.Hospitais.ToList();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
