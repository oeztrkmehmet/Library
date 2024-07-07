using Core.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Entities.LibraryEntities
{
    public class Author:BaseEntity
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public ICollection<Book> Books { get; set; }
    }
}
