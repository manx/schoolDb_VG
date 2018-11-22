using Microsoft.AspNetCore.Mvc;
using SchoolDb.Services;
using SchoolDb.ViewModels.Student;

namespace SchoolDb.Controllers
{
    public class StudentController : Controller
    {
        private readonly IStudentRepository _studentRepository;

        public StudentController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [Route("")]
        public IActionResult Default()
        {
            return Redirect("/Students/");
        }

        [Route("Students")]
        public IActionResult Index()
        {
            var studentIndexViewModel = new StudentIndexViewModel(_studentRepository.GetAll());

            return View(studentIndexViewModel);
        }

        [Route("Students/{id}")]
        public IActionResult StudentDetails(int id)
        {
            var studentDetailsViewModel = new StudentDetailsViewModel(_studentRepository.GetDetailsDtoById(id));
            return View(studentDetailsViewModel);
        }
    }
}