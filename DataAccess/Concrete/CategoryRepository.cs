using DataAccess.Abstract;
using Database.Context;
using Database.Entities.LibraryEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete
{
    public class CategoryRepository : EfCoreGenericRepository<Category, LibraryArchiveDbContext>, ICategoryRepository
    {
        public CategoryRepository(LibraryArchiveDbContext context):base(context)
        {
        }
    }
}
