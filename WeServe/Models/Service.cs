using System;
using System.Collections.Generic;

namespace WeServe.Models;

public partial class Service
{
    public int Serviceid { get; set; }

    public string ServiceProvidername { get; set; } = null!;

    public int Userid { get; set; }

    public virtual ICollection<BookingService> BookingServices { get; set; } = new List<BookingService>();

    public virtual User User { get; set; } = null!;
}
