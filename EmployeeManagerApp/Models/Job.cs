namespace EmployeeManagerApp.Models
{

    // only the edit page do it in ajax 

    public class Job
    {
        public int Id { get; set; }
        public Category Category { get; set; }

        public ICollection<EmployeeJob>? EmployeeJobs { get; set; } // Navigation property

    }

    public enum Category{
        First,
        Second,
        Third
    }
}
