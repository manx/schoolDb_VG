using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SchoolDb.Services;
using SchoolDb.ViewModels.Course;

namespace SchoolDb.Controllers
{
    public class CourseController : Controller
    {
        private readonly ICourseRepository _courseRepository;

        public CourseController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        [Route(("Courses"))]
        public IActionResult Index()
        {
            var courseIndexViewModel = new CourseIndexViewModel(_courseRepository.GetAll());
            return View(courseIndexViewModel);
        }

        [Route("Courses/{id}")]
        public IActionResult CourseDetails(int id)
        {
            var courseDetailsViewModel = new CourseDetailsViewModel(_courseRepository.GetById(id));
            return View(courseDetailsViewModel);
        }
    }
}