namespace WeServe.DTO
{
    public class AddServiceDTO
    {
        public int ServiceId { get; set; }
        public string ServiceProviderName { get; set; } = null!;
        public int UserId { get; set; }
    }
}
