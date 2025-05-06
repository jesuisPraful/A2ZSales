namespace A2ZSalesWebServices.Models
{
    public class User
    {
        public string EmailId { get; set; }
        public string UserPassword { get; set; }
        public Nullable<byte> RoleId { get; set; }
        public string? Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Address { get; set; }

    }
}
