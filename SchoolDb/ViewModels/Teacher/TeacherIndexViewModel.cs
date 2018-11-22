using System.Collections.Generic;
using SchoolDb.Models;

namespace SchoolDb.ViewModels.Teacher
{
    public class TeacherIndexViewModel : ViewModelBase
    {
        public TeacherIndexViewModel(IEnumerable<TeacherDetailsDto> teachers)
        {
            Title = "Lärare";
            Teachers = teachers;
        }
        public IEnumerable<TeacherDetailsDto> Teachers { get; set; }
    }
}
