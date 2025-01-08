using System;
using System.Collections.Generic;

namespace WeServe.Models;

public partial class BookingService
{
    public int BookingServiceId { get; set; }

    public string Service { get; set; } = null!;

    public DateTime Date { get; set; }

    public string DetailsProblem { get; set; } = null!;

    public bool Status { get; set; }

    public int Userid { get; set; }

    public int Serviceid { get; set; }

    public virtual Service ServiceNavigation { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
