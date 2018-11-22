using System.Collections.Generic;
using SchoolDb.Entities;

namespace SchoolDb.Models
{
    public class StudentDetailsDto
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public IEnumerable<Course> Courses { get; set; }
    }
}
