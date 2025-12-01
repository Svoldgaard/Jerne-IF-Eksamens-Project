using System;
using System.Collections.Generic;

namespace dataaccess.Entity;

public partial class Pladetal
{
    public int Id { get; set; }

    public string Pladeid { get; set; } = null!;

    public int Tal { get; set; }

    public virtual Plade Plade { get; set; } = null!;
}
