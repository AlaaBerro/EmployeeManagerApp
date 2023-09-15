using Microsoft.EntityFrameworkCore;

namespace EmployeeManagerApp.Models.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Db sets for models 

        public DbSet<Job> Jobs { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<EmployeeJob> EmployeeJobs { get; set; } 


        // to specify the realtion between tables in database 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeJob>()
                .HasKey(ej => new { ej.EmployeeId, ej.JobId });

            modelBuilder.Entity<EmployeeJob>()
                .HasOne(ej => ej.Employee)
                .WithMany(e => e.EmployeeJobs)
                .HasForeignKey(ej => ej.EmployeeId);

            modelBuilder.Entity<EmployeeJob>()
                .HasOne(ej => ej.Job)
                .WithMany(j => j.EmployeeJobs)
                .HasForeignKey(ej => ej.JobId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
