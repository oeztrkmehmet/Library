using DataAccess.Abstract;
using Database.Context;
using Database.DTOS.Book;
using Database.Entities.LibraryEntities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete
{
    public class BookRepository : EfCoreGenericRepository<Book, LibraryArchiveDbContext>, IBookRepository
    {
        private readonly LibraryArchiveDbContext _context;
        public BookRepository(LibraryArchiveDbContext context):base(context)
        {
            _context = context;
        }
        
        public List<BookDTO> GetAllBooks(Guid UserId) 
        { 
            var books = new List<BookDTO>();
            var bookList = _context.Books.Include(a => a.Author).Include(a => a.Category).Where(a => a.AppUserId == UserId).ToList();
            foreach (var item in bookList)
            {
                var book = new BookDTO
                {
                    UserId = item.AppUserId,
                    AuthorID = item.AuthorID,
                    AuthorNameSurname = item.Author.Name + " " + item.Author.Surname,
                    CategoryID = item.CategoryID,
                    CategoryName = item.Category.Name,
                    Description = item.Description,
                    Title = item.Title,
                    ID = item.ID
                };
                books.Add(book);
            }
            return books;
        }

        public BookDTO GetBookById(Guid BookId)
        {
            var book = _context.Books.Include(a => a.Author).Include(a => a.Category).FirstOrDefault(a => a.ID == BookId);
            var bookDto = new BookDTO
            {
                UserId = book.AppUserId,
                AuthorID = book.AuthorID,
                AuthorNameSurname = book.Author.Name + " " + book.Author.Surname,
                CategoryID = book.CategoryID,
                CategoryName = book.Category.Name,
                Description = book.Description,
                Title = book.Title,
                ID = book.ID
            };
            return bookDto;
        }
    }
}
