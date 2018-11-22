using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Remotion.Linq.Clauses;
using SchoolDb.Context;
using SchoolDb.Entities;
using SchoolDb.Models;

namespace SchoolDb.Services
{
    public class CourseRepository : ICourseRepository
    {
        private readonly SchoolDbContext _schoolDbContext;

        public CourseRepository(SchoolDbContext schoolDbContext)
        {
            _schoolDbContext = schoolDbContext;
        }
        public IEnumerable<CourseIndexDto> GetAll() =>
            from course in _schoolDbContext.Course.AsEnumerable()
            join assignment in _schoolDbContext.TeacherAssignment on course.Id equals assignment.CourseId
            let teacher = new TeacherRepository(_schoolDbContext).GetIndexDtoById(assignment.TeacherId)
            select new CourseIndexDto
            {
                Id = course.Id,
                Name = course.Name,
                Teacher = teacher
            };

        public CourseDetailsDto GetById(int id) =>
            (from course in _schoolDbContext.Course
             where course.Id == id
             join enrollment in _schoolDbContext.Enrollment on course.Id equals enrollment.CourseId into
                 enrollments
             let students = (from student in _schoolDbContext.Student
                             where enrollments.Any(e => e.StudentId == student.Id)
                             join person in _schoolDbContext.Person on student.PersonId equals person.Id
                             select new StudentIndexDto
                             {
                                 Id = student.Id,
                                 FirstName = person.FirstName,
                                 LastName = person.LastName
                             }).AsEnumerable()
             join assignment in _schoolDbContext.TeacherAssignment on course.Id equals assignment.CourseId
             let teacher = (from teacher in _schoolDbContext.Teacher
                            where assignment.TeacherId == teacher.Id
                            join person in _schoolDbContext.Person on teacher.PersonId equals person.Id
                            select new TeacherIndexDto
                            {
                                Id = teacher.Id,
                                FirstName = person.FirstName,
                                LastName = person.LastName
                            }).SingleOrDefault()
             select new CourseDetailsDto
             {
                 Id = course.Id,
                 Name = course.Name,
                 Teacher = teacher,
                 Students = students
             }).SingleOrDefault();

    }
}