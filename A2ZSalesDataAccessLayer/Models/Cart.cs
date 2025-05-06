using System;
using System.Collections.Generic;

namespace A2ZSalesDataAccessLayer.Models;

public partial class Cart
{
    public string ProductId { get; set; } = null!;

    public string EmailId { get; set; } = null!;

    public short Quantity { get; set; }

    public virtual User Email { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
