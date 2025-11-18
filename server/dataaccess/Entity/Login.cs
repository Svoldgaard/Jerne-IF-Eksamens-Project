using System;
using System.Collections.Generic;

namespace dataaccess.Entity;

public partial class Login
{
    public int Brugerid { get; set; }

    public string Brugernavn { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int Rolleid { get; set; }

    public virtual ICollection<Plade> Plades { get; set; } = new List<Plade>();

    public virtual ICollection<Profil> Profils { get; set; } = new List<Profil>();

    public virtual Rolle Rolle { get; set; } = null!;
}
