using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using EmployeeManagerApp.Models;
using EmployeeManagerApp.Models.Database;

namespace EmployeeManagerApp.Controllers
{
    public class EmployeesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public EmployeesController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        // return the list of employees as json
        public JsonResult EmployeeList()
        {
            var data = _context.Employees.ToList();
            return new JsonResult(data);
        }

        // load jobs for a specific employee
        public JsonResult LoadJobs(int id)
        {
            var employees = _context.EmployeeJobs
               .Where(ej => ej.EmployeeId == id)
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
        public JsonResult AddEmployee(Employee employee)
        {
            var emp = new Employee()
            {
                Name = employee.Name,
                BirthDate = employee.BirthDate,
                Phone = employee.Phone,
                EmploymentDate = employee.EmploymentDate,
                Governorate = employee.Governorate,
                IsProbation = employee.IsProbation,
                IsDeleted = employee.IsDeleted
            };
            _context.Employees.Add(emp);
            _context.SaveChanges();
            return new JsonResult("Data is saved") ;
        }

        public JsonResult Delete(int id)
        {
            var data = _context.Employees.Where(e => e.Id == id).SingleOrDefault();
            if(data != null)
            {
            _context.Employees.Remove(data);
            _context.SaveChanges();
            return new JsonResult("Data deleted");
            }
            return new JsonResult("data is not deleted");
        }

        public JsonResult Edit(int id)
        {
            var data = _context.Employees.Where(e => e.Id == id).SingleOrDefault();
            // send response to ajax
            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult Update(Employee employee)
        {
            var data = _context.Employees.Update(employee);
            _context.SaveChanges();
            return new JsonResult("Record Updated!");
        }
    }   
}
