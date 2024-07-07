using Core.Base;
using Database.Entities.UserEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Entities.LibraryEntities
{
    public class Book:BaseEntity
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public virtual Guid AuthorID { get; set; }
        public virtual Author Author { get; set; }
        public virtual Guid CategoryID { get; set; }
        public virtual Category Category { get; set; }
        public virtual Guid AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
    }
}
