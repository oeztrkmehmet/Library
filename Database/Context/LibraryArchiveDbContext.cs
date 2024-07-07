using Database.Entities.LibraryEntities;
using Database.Entities.UserEntities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Context
{
    public class LibraryArchiveDbContext:IdentityDbContext<AppUser, AppRole,Guid>
    {
        public LibraryArchiveDbContext(DbContextOptions<LibraryArchiveDbContext>options):base(options)
        {
        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }
    }
}
