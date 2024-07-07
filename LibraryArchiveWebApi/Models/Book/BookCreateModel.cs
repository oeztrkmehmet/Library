namespace LibraryArchiveWebApi.Models.Book
{
    public class BookCreateModel
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public Guid AuthorID { get; set; }
        public Guid CategoryID { get; set; }
    }
}
