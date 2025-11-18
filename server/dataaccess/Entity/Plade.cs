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
}
