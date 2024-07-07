using Core.BaseCore;
using DataAccess.Abstract;
using Database.DTOS.Author;
using Database.Entities.LibraryEntities;
using LibraryArchiveWebApi.Models.Author;
using Microsoft.AspNetCore.Mvc;
using System;

namespace LibraryArchiveWebApi.Controllers
{
    public class AuthorController : BaseController
    {
        private IAuthorRepository _authorRepository;
        public AuthorController(IAuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }
        [HttpPost("CreateAuthor")]
        public IActionResult CreateAuthor(AuthorAddOrUpdateModel model)
        {
            if (model != null && !string.IsNullOrEmpty(model.Name) && !string.IsNullOrEmpty(model.Surname))
            {
                Author author = new Author
                {
                    Name = model.Name,
                    Surname = model.Surname,
                };
                bool resp = _authorRepository.Create(author);
                if (resp)
                {
                    return Ok("Yazar kaydı başarılı bir şekilde gerçekleşti.");
                }
                else
                {
                    return BadRequest("Yazar kaydı yapılırken bir sorun oluştu.");
                }
            }
            else
            {
                return BadRequest("Bilgiler eksik olduğu için kayıt yapılamadı.");
            }

        }

        [HttpDelete("DeleteAuthor")]
        public IActionResult DeleteAuthor(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                var Id = Guid.Parse(id);
                var author = _authorRepository.GetById(Id);
                if (author != null)
                {
                    bool resp = _authorRepository.Delete(author);
                    if (resp)
                    {
                        return Ok("Yazar kaydı başarılı bir şekilde silindi.");
                    }
                    else
                    {
                        return BadRequest("Yazar kaydı silinirken bir sorun oluştu.");
                    }
                }
                else
                {
                    return BadRequest("Yazar bulunamadığı için silinemedi.");
                }
            }
            else
            {
                return BadRequest("Id parametresi alınamadığı için yazar silinemedi.");
            }
        }

        [HttpPost("UpdateAuthor")]
        public IActionResult UpdateAuthor(AuthorAddOrUpdateModel model)
        {
            if (!string.IsNullOrEmpty(model.Id))
            {
                var Id = Guid.Parse(model.Id);
                var author = _authorRepository.GetById(Id);
                if (author != null)
                {
                    author.Name = model.Name;
                    author.Surname = model.Surname;
                    bool resp = _authorRepository.Update(author);
                    if (resp)
                    {
                        return Ok("Yazar kaydı başarılı bir şekilde güncellendi.");
                    }
                    else
                    {
                        return BadRequest("Yazar kaydı güncellenirken bir sorun oluştu.");
                    }
                }
                else
                {
                    return BadRequest("Yazar bulunamadığı için güncellenemedi.");
                }
            }
            else
            {
                return BadRequest("Id parametresi alınamadığı için yazar güncellenemedi.");
            }
        }
        [HttpGet("GetAllAuthors")]
        public List<AuthorDTO> GetAllAuthors()
        {
            var authorList = _authorRepository.GetAll(a => a.IsActive);
            var returnList = authorList.Select(author => new AuthorDTO { ID = author.ID, Name = author.Name, Surname = author.Surname }).ToList();
            return returnList;
        }

        [HttpGet("GetAuthor")]
        public IActionResult GetAuthor(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                var Id = Guid.Parse(id);
                var author = _authorRepository.GetById(Id);
                if (author != null)
                {
                    return Ok(author);
                }
                else
                {
                    return BadRequest("Bu id ile ilgili bir yazar kaydı bulunmamaktadır.");
                }
            }
            else 
            { 
                return BadRequest("Id parametresi alınamadığı için yazar kaydı bulunamadı.");
            }

        }
    }
}
