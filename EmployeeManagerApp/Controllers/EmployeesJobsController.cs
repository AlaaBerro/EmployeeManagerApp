using EmployeeManagerApp.Models;
using EmployeeManagerApp.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagerApp.Controllers
{
    public class EmployeesJobsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public EmployeesJobsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult EmployeeJobList(int? employeeId)
        {
            List<object> employeeJobs; // Declare the variable outside the if block

            if (employeeId != null)
            {
                // Filter and retrieve jobs related to the specific employee
                employeeJobs = _context.EmployeeJobs.Where(ej => ej.EmployeeId == employeeId).ToList<object>();
            }
            else
            {
                // Retrieve and return all employee job data
                employeeJobs = _context.EmployeeJobs
                    .Include(ej => ej.Employee)
                    .Include(ej => ej.Job)
                    .Select(ej => new
                    {
                        eid = ej.EmployeeId,
                        jid = ej.JobId,
                        EmployeeName = ej.Employee.Name,
                        JobName = ej.Job.Category,
                        IsActive = ej.IsActivated
                    })
                    .ToList<object>();
            }

            return new JsonResult(employeeJobs);
        }

        public JsonResult GetId()
        {
            var employeeIds = _context.Employees.Select(e => e.Id).ToList();
            var jobIds = _context.Jobs.Select(j => j.Id).ToList();

            var result = new
            {
                EmployeeIds = employeeIds,
                JobIds = jobIds
            };

            return new JsonResult(result);

        }

        [HttpPost]
        public JsonResult AddEmployeeJob(EmployeeJob empjob)
        {
            // if any id not exist it will not save .
            var employee = _context.Employees.Where(e => e.Id == empjob.EmployeeId);
            var job = _context.Employees.Where(e => e.Id == empjob.JobId);

            var employeejob = new EmployeeJob()
            {
                EmployeeId = empjob.EmployeeId,
                JobId = empjob.JobId,
                IsActivated = empjob.IsActivated,
            };
            _context.EmployeeJobs.Add(employeejob);
            _context.SaveChanges();
            return new JsonResult("Data is saved");
        }

        public JsonResult Edit(int eid, int jid)
        {
            // Retrieve data based on both eid and jid
            var data = _context.EmployeeJobs
                .Where(ej => ej.EmployeeId == eid && ej.JobId == jid)
                .SingleOrDefault();

            // Check if data is found
            if (data != null)
            {
                // Return the data as JSON
                return new JsonResult(data);
            }
            else
            {
                // Return an error message or status code if data is not found
                return new JsonResult("Data not found") { StatusCode = 404 };
            }
        }

        [HttpPost]
        public JsonResult Update(EmployeeJob ejob)
        {
            _context.EmployeeJobs.Update(ejob);
            _context.SaveChanges();
            return new JsonResult("Record Updated!");
        }
    }
}
