using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolDb.Models;

namespace SchoolDb.Services
{
    public interface ICourseRepository
    {
        IEnumerable<CourseIndexDto> GetAll();
        CourseDetailsDto GetById(int id);
    }
}
