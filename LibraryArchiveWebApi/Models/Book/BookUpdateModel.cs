namespace LibraryArchiveWebApi.Models.Book
{
    public class BookUpdateModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? AuthorID { get; set; }
        public string? CategoryID { get; set; }
    }
}
