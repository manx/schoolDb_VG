using System.Collections.Generic;
using SchoolDb.Models;

namespace SchoolDb.ViewModels.Student
{
    public class StudentIndexViewModel : ViewModelBase
    {
        public StudentIndexViewModel(IEnumerable<StudentDetailsDto> students)
        {
            Title = "Studenter";
            Students = students;
        }

        public IEnumerable<StudentDetailsDto> Students { get; set; }
    }
}
