using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolDb.Models
{
    public class CourseDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TeacherIndexDto Teacher { get; set; }
        public IEnumerable<StudentIndexDto> Students { get; set; }
    }
}
