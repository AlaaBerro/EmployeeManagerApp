using MessagePack;

namespace EmployeeManagerApp.Models
{
    public class EmployeeJob
    {
        
        public int EmployeeId { get; set; }
        public int JobId { get; set; }
        public bool IsActivated { get; set; }
        public Employee? Employee { get; set; }
        public Job? Job { get; set; }
    }
}
