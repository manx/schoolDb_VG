using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolDb.Entities;
using SchoolDb.Models;

namespace SchoolDb.Services
{
    public interface ITeacherRepository
    {
        IEnumerable<TeacherDetailsDto> GetAll();
        TeacherDetailsDto GetDetailsDtoById(int id);
        TeacherIndexDto GetIndexDtoById(int id);
    }
}
