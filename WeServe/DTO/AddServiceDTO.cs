namespace WeServe.DTO
{
    public class AddServiceDTO
    {
        public string ServiceProviderName { get; set; } = null!;
        public int UserId { get; set; }
        public int? Priceperhour { get; set; }

    }
}
