using System.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace dm_api.Data
{

    //public class DataContext : DbContext
    public class DataContext : DbContext
    {
        public IConfiguration Configuration { get; }
        public DataContext(DbContextOptions<DataContext> options, IConfiguration configuration) : base(options)
        {
            Configuration = configuration;
        }

        // protected override void OnModelCreating(ModelBuilder builder)
        // {
        //     base.OnModelCreating(builder);

        //     //optionsBuilder.UseSqlServer(connection);
        // }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     var connection = Configuration.GetConnectionString("dmDbConnection");

        //     optionsBuilder.UseSqlServer(connection);
        // }
        public DbSet<Enfermeiro> Enfermeiros { get; set; }
        public DbSet<Hospital> Hospitais { get; set; }
    }
}