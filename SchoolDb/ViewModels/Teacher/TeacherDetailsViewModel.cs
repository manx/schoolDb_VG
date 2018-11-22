using System.Text;
using System.Threading.Tasks;
using SchoolDb.Models;

namespace SchoolDb.ViewModels.Teacher
{
    public class TeacherDetailsViewModel : ViewModelBase
    {
        public TeacherDetailsViewModel(TeacherDetailsDto teacher)
        {
            Teacher = teacher;
            Title = $"Lärare - {teacher.FirstName} {teacher.LastName}";
        }

        public TeacherDetailsDto Teacher { get; set; }

    }
}
