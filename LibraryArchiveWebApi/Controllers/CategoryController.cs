using Core.BaseCore;
using DataAccess.Abstract;
using Database.DTOS.Category;
using Database.Entities.LibraryEntities;
using LibraryArchiveWebApi.Models.Category;
using Microsoft.AspNetCore.Mvc;

namespace LibraryArchiveWebApi.Controllers
{
    public class CategoryController : BaseController
    {
        private ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        [HttpPost("CreateCategory")]
        public IActionResult CreateCategory(CategoryAddOrUpdateModel model)
        {
            if (model != null && !string.IsNullOrEmpty(model.Name))
            {
                Category Category = new Category
                {
                    Name = model.Name
                };
                bool resp = _categoryRepository.Create(Category);
                if (resp)
                {
                    return Ok("Kategori kaydı başarılı bir şekilde gerçekleşti.");
                }
                else
                {
                    return BadRequest("Kategori kaydı yapılırken bir sorun oluştu.");
                }
            }
            else
            {
                return BadRequest("Bilgiler eksik olduğu için kayıt yapılamadı.");
            }

        }

        [HttpDelete("DeleteCategory")]
        public IActionResult DeleteCategory(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                var Id = Guid.Parse(id);
                var Category = _categoryRepository.GetById(Id);
                if (Category != null)
                {
                    bool resp = _categoryRepository.Delete(Category);
                    if (resp)
                    {
                        return Ok("Kategori kaydı başarılı bir şekilde silindi.");
                    }
                    else
                    {
                        return BadRequest("Kategori kaydı silinirken bir sorun oluştu.");
                    }
                }
                else
                {
                    return BadRequest("Kategori bulunamadığı için silinemedi.");
                }
            }
            else
            {
                return BadRequest("Id parametresi alınamadığı için kategori silinemedi.");
            }
        }

        [HttpPost("UpdateCategory")]
        public IActionResult UpdateCategory(CategoryAddOrUpdateModel model)
        {
            if (!string.IsNullOrEmpty(model.Id))
            {
                var Id = Guid.Parse(model.Id);
                var Category = _categoryRepository.GetById(Id);
                if (Category != null)
                {
                    Category.Name = model.Name;
                    bool resp = _categoryRepository.Update(Category);
                    if (resp)
                    {
                        return Ok("Kategori kaydı başarılı bir şekilde güncellendi.");
                    }
                    else
                    {
                        return BadRequest("Kategori kaydı güncellenirken bir sorun oluştu.");
                    }
                }
                else
                {
                    return BadRequest("Kategori bulunamadığı için güncellenemedi.");
                }
            }
            else
            {
                return BadRequest("Id parametresi alınamadığı için kategori güncellenemedi.");
            }
        }
        [HttpGet("GetAllCategories")]
        public List<CategoryDTO> GetAllCategories()
        {
            var CategoryList = _categoryRepository.GetAll(a => a.IsActive);
            var returnList = CategoryList.Select(Category => new CategoryDTO { ID = Category.ID, Name = Category.Name }).ToList();
            return returnList;
        }

        [HttpGet("GetCategory")]
        public IActionResult GetCategory(string id)
        {
            if (!string.IsNullOrEmpty(id))
            {
                var Id = Guid.Parse(id);
                var Category = _categoryRepository.GetById(Id);
                if (Category != null)
                {
                    return Ok(Category);
                }
                else
                {
                    return BadRequest("Bu id ile ilgili bir kategori kaydı bulunmamaktadır.");
                }
            }
            else
            {
                return BadRequest("Id parametresi alınamadığı için kategori kaydı bulunamadı.");
            }

        }
    }
}
