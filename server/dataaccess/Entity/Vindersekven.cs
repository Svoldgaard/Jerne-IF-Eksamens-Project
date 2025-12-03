using System;
using System.Collections.Generic;

namespace dataaccess.Entity;

public partial class Vindersekven
{
    public int Id { get; set; }

    public List<int>? Vindertal { get; set; }

    public int Spilugeid { get; set; }

    public virtual Spiluge Spiluge { get; set; } = null!;
}
