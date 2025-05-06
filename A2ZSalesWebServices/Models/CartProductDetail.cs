namespace A2ZSalesWebServices.Models
{
    public class CartProductDetail
    {
        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public short Quantity { get; set; }
        public int QuantityAvailable { get; set; }

    }
}
