using System;
using System.Collections.Generic;

namespace dataaccess.Entity;

public partial class Price
{
    public int Id { get; set; }

    public int Price1 { get; set; }

    public virtual ICollection<Plade> Plades { get; set; } = new List<Plade>();
}
