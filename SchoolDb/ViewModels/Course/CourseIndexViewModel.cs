using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolDb.Models;

namespace SchoolDb.ViewModels.Course
{
    public class CourseIndexViewModel : ViewModelBase
    {
        public CourseIndexViewModel(IEnumerable<CourseIndexDto> courses)
        {
            Title = "Kurser";
            Courses = courses;
        }

        public IEnumerable<CourseIndexDto> Courses { get; set; }
    }
}
