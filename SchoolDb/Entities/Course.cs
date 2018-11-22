using System.Collections.Generic;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace SchoolDb.Entities
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
