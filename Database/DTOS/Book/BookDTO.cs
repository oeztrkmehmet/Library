using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.DTOS.Book
{
    public class BookDTO
    {
        public Guid ID { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string AuthorNameSurname { get; set; }
        public string CategoryName { get; set; }
        public  Guid AuthorID { get; set; }
        public  Guid CategoryID { get; set; }
        public  Guid UserId { get; set; }
    }
}
