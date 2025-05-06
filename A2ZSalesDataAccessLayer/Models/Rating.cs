using System;
using System.Collections.Generic;

namespace A2ZSalesDataAccessLayer.Models;

public partial class Rating
{
    public string EmailId { get; set; } = null!;

    public string ProductId { get; set; } = null!;

    public string? ProductName { get; set; }

    public byte ReviewRating { get; set; }

    public string? ReviewComments { get; set; }

    public virtual User Email { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;

    public virtual Product? ProductNameNavigation { get; set; }
}
