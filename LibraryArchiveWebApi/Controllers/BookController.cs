using Core.BaseCore;
using DataAccess.Abstract;
using Database.DTOS.Book;
using Database.Entities.LibraryEntities;
using LibraryArchiveWebApi.Models.Book;
using Microsoft.AspNetCore.Mvc;

namespace LibraryArchiveWebApi.Controllers
{
    public class BookController : BaseController
    {
        private IBookRepository _bookRepository;
        public BookController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }
        [HttpPost("CreateBook")]
        public IActionResult CreateBook(BookCreateModel model)
        {
            if (model != null && !string.IsNullOrEmpty(model.Title))
            {
                var userId = Guid.Parse(UserId);
                Book book = new Book
                {
                    Title = model.Title,
                    CategoryID = model.CategoryID,
                    AppUserId = userId,
                    AuthorID = model.AuthorID,
                    Description = model.Description
                };
                bool resp = _bookRepository.Create(book);
                if (resp)
                {
                    return Ok("Kitap kaydı başarılı bir şekilde gerçekleşti.");
                }
                else
                {
                    return BadRequest("Kitap kaydı yapılırken bir sorun oluştu.");
                }
            }
            else
            {
                return BadRequest("Bilgiler eksik olduğu için kayıt yapılamadı.");
            }

        }

        [HttpDelete("DeleteBook")]
        public IActionResult DeleteBook(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                var Id = Guid.Parse(id);
                var Book = _bookRepository.GetById(Id);
                if (Book != null)
                {
                    bool resp = _bookRepository.Delete(Book);
                    if (resp)
                    {
                        return Ok("Kitap kaydı başarılı bir şekilde silindi.");
                    }
                    else
                    {
                        return BadRequest("Kitap kaydı silinirken bir sorun oluştu.");
                    }
                }
                else
                {
                    return BadRequest("Kitap bulunamadığı için silinemedi.");
                }
            }
            else
            {
                return BadRequest("Id parametresi alınamadığı için kitap silinemedi.");
            }
        }

        [HttpPost("UpdateBook")]
        public IActionResult UpdateBook(BookUpdateModel model)
        {
            if (!string.IsNullOrEmpty(model.Id))
            {
                var Id = Guid.Parse(model.Id);
                var Book = _bookRepository.GetById(Id);
                if (Book != null)
                {
                    Book.Title = model.Title;
                    Book.Description = model.Description;
                    Book.AuthorID = model.AuthorID != null ? Guid.Parse(model.AuthorID) : Book.AuthorID;
                    Book.CategoryID = model.CategoryID != null ? Guid.Parse(model.CategoryID) : Book.CategoryID;
                    Book.AppUserId = Guid.Parse(UserId);
                    bool resp = _bookRepository.Update(Book);
                    if (resp)
                    {
                        return Ok("Kitap kaydı başarılı bir şekilde güncellendi.");
                    }
                    else
                    {
                        return BadRequest("Kitap kaydı güncellenirken bir sorun oluştu.");
                    }
                }
                else
                {
                    return BadRequest("Kitap bulunamadığı için güncellenemedi.");
                }
            }
            else
            {
                return BadRequest("Id parametresi alınamadığı için kitap güncellenemedi.");
            }
        }
        [HttpGet("GetAllBooks")]
        public List<BookDTO> GetAllBooks()
        {
            var returnList = _bookRepository.GetAllBooks(Guid.Parse(UserId));
            return returnList;
        }

        [HttpGet("GetBook")]
        public IActionResult GetBook(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                var Book = _bookRepository.GetBookById(Guid.Parse(id));
                if (Book != null)
                {
                    return Ok(Book);
                }
                else
                {
                    return BadRequest("Bu id ile ilgili bir kitap kaydı bulunmamaktadır.");
                }
            }
            else
            {
                return BadRequest("Id parametresi alınamadığı için kitap kaydı bulunamadı.");
            }

        }
    }
}
