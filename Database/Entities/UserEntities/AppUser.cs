using Database.Entities.LibraryEntities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Entities.UserEntities
{
    public class AppUser : IdentityUser<Guid>
    {
        public string NameSurname { get; set; }
        public ICollection<Book> Books { get; set; }
    }
}
