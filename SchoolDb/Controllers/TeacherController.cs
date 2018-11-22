using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SchoolDb.Services;
using SchoolDb.ViewModels;
using SchoolDb.ViewModels.Teacher;

namespace SchoolDb.Controllers
{
    public class TeacherController : Controller
    {
        private readonly ITeacherRepository _teacherRepository;

        public TeacherController(ITeacherRepository teacherRepository)
        {
            _teacherRepository = teacherRepository;
        }

        [Route("Teachers")]
        public IActionResult Index()
        {
            var viewModel = new TeacherIndexViewModel(_teacherRepository.GetAll());
            return View(viewModel);
        }

        [Route("Teachers/{id}")]
        public IActionResult TeacherDetailsView(int id)
        {
            var viewModel = new TeacherDetailsViewModel(_teacherRepository.GetDetailsDtoById(id));
            return View(viewModel);
        }
    }
}