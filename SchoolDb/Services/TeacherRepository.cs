using SchoolDb.Context;
using SchoolDb.Models;
using System.Collections.Generic;
using System.Linq;

namespace SchoolDb.Services
{
    public class TeacherRepository : ITeacherRepository
    {
        private readonly SchoolDbContext _schoolDbContext;

        public TeacherRepository(SchoolDbContext schoolDbContext)
        {
            _schoolDbContext = schoolDbContext;
        }

        public IEnumerable<TeacherDetailsDto> GetAll() =>
            from teacher in _schoolDbContext.Teacher
            join person in _schoolDbContext.Person on teacher.PersonId equals person.Id
            select new TeacherDetailsDto
            {
                Id = teacher.Id,
                FirstName = person.FirstName,
                LastName = person.LastName
            };


        public TeacherDetailsDto GetDetailsDtoById(int id) =>
            (from teacher in _schoolDbContext.Teacher.Where(t => t.Id == id)
             join person in _schoolDbContext.Person on teacher.PersonId equals person.Id
             join assignment in _schoolDbContext.TeacherAssignment on teacher.Id equals assignment.TeacherId into assignments
             from _ in assignments.DefaultIfEmpty()
             let courses = _schoolDbContext.Course.Where(c => assignments.Any(e => e.CourseId == c.Id))
             select new TeacherDetailsDto
             {
                 Id = teacher.Id,
                 FirstName = person.FirstName,
                 LastName = person.LastName,
                 Courses = courses
             }).SingleOrDefault();

        public TeacherIndexDto GetIndexDtoById(int id) => 
            (from teacher in _schoolDbContext.Teacher
             where teacher.Id == id
             join person in _schoolDbContext.Person on teacher.PersonId equals person.Id
             select new TeacherIndexDto
             {
                 Id = teacher.Id,
                 FirstName = person.FirstName,
                 LastName = person.LastName
             }).SingleOrDefault();
    }
}