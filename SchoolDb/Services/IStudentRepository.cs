using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolDb.Entities;
using SchoolDb.Models;

namespace SchoolDb.Services
{
    public interface IStudentRepository
    {
        IEnumerable<StudentDetailsDto> GetAll();
        StudentDetailsDto GetDetailsDtoById(int id);
        StudentIndexDto GetIndexDtoById(int id);
    }
}
