using System;
using System.Collections.Generic;

namespace dataaccess.Entity;

public partial class Plade
{
    public string Id { get; set; } = null!;

    public int Ugetalid { get; set; }

    public List<int>? Valgtetal { get; set; }

    public bool Gentag { get; set; }

    public int Brugerid { get; set; }

    public int? Priceid { get; set; }

    public bool Iswinner { get; set; }

    public bool Status { get; set; }

    public virtual Login Bruger { get; set; } = null!;

    public virtual Pricing? Price { get; set; }

    public virtual Spiluge Ugetal { get; set; } = null!;
}
