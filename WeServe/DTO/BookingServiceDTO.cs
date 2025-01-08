namespace WeServe.DTO
{
    public class BookingServiceDTO
    {
        public int BookingServiceId { get; set; }
        public string Service { get; set; } = null!;
        public DateTime Date { get; set; }
        public string DetailsProblem { get; set; } = null!;
        public bool Status { get; set; }
        public int UserId { get; set; }
        public int ServiceId { get; set; }
    }
}
