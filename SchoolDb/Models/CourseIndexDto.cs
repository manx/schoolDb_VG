using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolDb.Models
{
    public class CourseIndexDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TeacherIndexDto Teacher { get; set; }
    }
}
