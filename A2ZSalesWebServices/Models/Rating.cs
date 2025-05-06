namespace A2ZSalesWebServices.Models
{
    public class Rating
    {
        public string EmailId { get; set; }
        public string ProductId { get; set; }

        public string? ProductName { get; set; }
        public Nullable<byte> ReviewRating { get; set; }
        public string? ReviewComments { get; set; }

    }
}
