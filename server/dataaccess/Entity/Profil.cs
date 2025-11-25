using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace dataaccess.Entity;

public partial class Profil
{
    public int Id { get; set; }

    public string Fnavn { get; set; } = null!;

    public string Lnavn { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Mobil { get; set; }
    
    [Column("rolleid")] 
    public int Rolleid { get; set; }

    public int Brugerid { get; set; }

    public bool Aktiv { get; set; }

    public int Rolleid { get; set; }

    public virtual Login Bruger { get; set; } = null!;

    public virtual Rolle Rolle { get; set; } = null!;
}
