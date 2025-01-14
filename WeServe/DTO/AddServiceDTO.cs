namespace WeServe.DTO
{
    public class AddServiceDTO
    {
        public string? ServiceProviderName { get; set; } // يمكن أن يكون null
        public int UserId { get; set; } // الحقل مطلوب ولا يمكن أن يكون null
        public int? Priceperhour { get; set; } // يمكن أن يكون null
    }
}
