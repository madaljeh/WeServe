using System;
using System.Collections.Generic;

namespace WeServe.Models;

public partial class Contactu
{
    public int Id { get; set; }

    public string? Fullname { get; set; }

    public string? Email { get; set; }

    public string? Phonenumber { get; set; }

    public string? Massage { get; set; }
}
