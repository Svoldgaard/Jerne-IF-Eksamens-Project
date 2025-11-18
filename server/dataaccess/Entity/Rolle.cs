using System;
using System.Collections.Generic;

namespace dataaccess.Entity;

public partial class Rolle
{
    public int Rolleid { get; set; }

    public string Rollenavn { get; set; } = null!;

    public virtual ICollection<Login> Logins { get; set; } = new List<Login>();
}
