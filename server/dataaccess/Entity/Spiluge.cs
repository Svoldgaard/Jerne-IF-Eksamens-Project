using System;
using System.Collections.Generic;

namespace dataaccess.Entity;

public partial class Spiluge
{
    public int Id { get; set; }

    public int? Ugetal { get; set; }

    public int? Årstal { get; set; }

    public bool? Status { get; set; }

    public virtual ICollection<Plade> Plades { get; set; } = new List<Plade>();

    public virtual ICollection<Vindersekven> Vindersekvens { get; set; } = new List<Vindersekven>();
}
