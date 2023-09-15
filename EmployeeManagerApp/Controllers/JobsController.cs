using EmployeeManagerApp.Models;
using EmployeeManagerApp.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagerApp.Controllers
{
    public class JobsController : Controller
    {

        private readonly ApplicationDbContext _context;

        public JobsController(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult JobList()
        {
            var data = _context.Jobs.ToList();
            return new JsonResult(data);
        }


        public JsonResult LoadEmployees(int id)
        {
         var employees = _context.EmployeeJobs
            .Where(ej => ej.JobId == id)
            .Select(ej => new
            {
                EmployeeId = ej.EmployeeId,
                EmployeeName = ej.Employee.Name,
                JobId = ej.JobId
            })
            .ToList();

            return new JsonResult(employees);
        }

        [HttpPost]
        public JsonResult AddJob(Job job)
        {
            _context.Jobs.Add(job);
            _context.SaveChanges();
            return new JsonResult("Data is saved");
        }

        public JsonResult Delete(int id)
        {
            var data = _context.Jobs.Where(e => e.Id == id).SingleOrDefault();
            if (data != null)
            {
                _context.Jobs.Remove(data);
                _context.SaveChanges();
                return new JsonResult("Data deleted");
            }

            return new JsonResult("data is not deleted");
        }

        public JsonResult Edit(int id)
        {
            var data = _context.Jobs.Where(e => e.Id == id).SingleOrDefault();
            // send response to ajax
            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult Update(Job job)
        {
            _context.Jobs.Update(job);
            _context.SaveChanges();
            return new JsonResult("Record Updated!");
        }
    }
}
