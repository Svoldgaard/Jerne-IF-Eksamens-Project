using System;
using System.Collections.Generic;

namespace dataaccess.Entity;

public partial class Plade
{
    public string Id { get; set; } = null!;

    public int Valgtetal { get; set; }

    public int Ugetal { get; set; }

    public bool Gentag { get; set; }

    public int Brugerid { get; set; }

    public int? Priceid { get; set; }

    public virtual Login Bruger { get; set; } = null!;

    public virtual ICollection<Pladetal> Pladetals { get; set; } = new List<Pladetal>();

    public virtual Pricing? Price { get; set; }
}
