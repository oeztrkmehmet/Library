using Database.DTOS.Book;
using Database.Entities.LibraryEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
    public interface IBookRepository:IRepository<Book>
    {
        public List<BookDTO> GetAllBooks(Guid UserId);
        public BookDTO GetBookById(Guid BookId);
    }
}
