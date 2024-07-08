using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace Demo.Invoices.Dto
{
    [AutoMapFrom(typeof(Invoice))]
    [AutoMapTo(typeof(Invoice))]
    public class InvoiceDto : EntityDto<int>
    {
        public string InvoiceNumber { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
