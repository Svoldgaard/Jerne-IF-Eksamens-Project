using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dataaccess.Entity;

public partial class Vindersekven
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public List<int>? Vindertal { get; set; }

    public int Spilugeid { get; set; }

    public virtual Spiluge Spiluge { get; set; } = null!;
}
