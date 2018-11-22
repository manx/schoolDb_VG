using SchoolDb.Context;
using SchoolDb.Models;
using System.Collections.Generic;
using System.Linq;

namespace SchoolDb.Services
{
    public class StudentRepository : IStudentRepository
    {
        private readonly SchoolDbContext _schoolDbContext;

        public StudentRepository(SchoolDbContext schoolDbContext)
        {
            _schoolDbContext = schoolDbContext;
        }

        public IEnumerable<StudentDetailsDto> GetAll() =>
            from student in _schoolDbContext.Student
            join person in _schoolDbContext.Person on student.PersonId equals person.Id
            select new StudentDetailsDto
            {
                Id = student.Id,
                FirstName = person.FirstName,
                LastName = person.LastName,
            };
        
        public StudentDetailsDto GetDetailsDtoById(int id) =>
            (from student in _schoolDbContext.Student where student.Id == id
            join person in _schoolDbContext.Person on student.PersonId equals person.Id
            join enrollment in _schoolDbContext.Enrollment on student.Id equals enrollment.StudentId into enrollments
            let courses = _schoolDbContext.Course.Where(c => enrollments.Any(e => e.CourseId == c.Id))
            select new StudentDetailsDto
            {
                Id = student.Id,
                PersonId = person.Id,
                FirstName = person.FirstName,
                LastName = person.LastName,
                Courses = courses
            })
            .SingleOrDefault();

        public StudentIndexDto GetIndexDtoById(int id) =>
            (from student in _schoolDbContext.Student where student.Id == id
            join person in _schoolDbContext.Person on student.PersonId equals person.Id
            select new StudentIndexDto()
            {
                Id = student.Id,
                FirstName = person.FirstName,
                LastName = person.LastName,
            })
            .SingleOrDefault();
    }
}


