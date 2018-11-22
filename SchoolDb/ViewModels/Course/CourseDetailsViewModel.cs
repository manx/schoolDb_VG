using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolDb.Models;

namespace SchoolDb.ViewModels.Course
{
    public class CourseDetailsViewModel : ViewModelBase
    {
        public CourseDetailsViewModel(CourseDetailsDto course)
        {
            Course = course;
            Title = $"Kurs - {course.Name}";
        }

        public CourseDetailsDto Course { get; set; }
    }
}
