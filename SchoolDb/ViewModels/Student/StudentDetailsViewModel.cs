using SchoolDb.Models;

namespace SchoolDb.ViewModels.Student
{
    public class StudentDetailsViewModel : ViewModelBase
    {
        public StudentDetailsViewModel(StudentDetailsDto student)
        {
            Student = student;
            Title = $"Student - {student.FirstName} {student.LastName}";
        }

        public StudentDetailsDto Student { get; set; }
    }
}
