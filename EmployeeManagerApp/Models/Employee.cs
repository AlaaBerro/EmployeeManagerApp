using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace EmployeeManagerApp.Models
{
    public class Employee
    {
        
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        [Required]
        public string Phone { get; set; }
        public DateTime EmploymentDate { get; set; }     
        [Required]
        public Governorate Governorate { get; set; }
        [Required]
        public bool IsProbation { get; set; }
        [Required]
        public bool IsDeleted { get; set; }

        public ICollection<EmployeeJob>? EmployeeJobs { get; set; } 

       
    }
    public enum Governorate
    {
        Akkar, Beirut, Beqaa, Nabatieh, Batroun
    }


}
