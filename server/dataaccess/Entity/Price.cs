using System;
using System.Collections.Generic;

namespace dataaccess.Entity;

public partial class Pricing
{
    public int Id { get; set; }

    public int Price { get; set; }

    public virtual ICollection<Plade> Plades { get; set; } = new List<Plade>();
}
