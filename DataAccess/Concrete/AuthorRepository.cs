using DataAccess.Abstract;
using Database.Context;
using Database.Entities.LibraryEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete
{
    public class AuthorRepository : EfCoreGenericRepository<Author, LibraryArchiveDbContext>, IAuthorRepository
    {
        public AuthorRepository(LibraryArchiveDbContext context) : base(context)
        {

        }
    }
}
