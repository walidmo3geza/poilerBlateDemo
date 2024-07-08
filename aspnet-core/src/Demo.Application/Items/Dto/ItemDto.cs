using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Demo.Products;

namespace Demo.Items.Dto
{
    [AutoMapFrom(typeof(Item))]
    [AutoMapTo(typeof(Item))]
    public class ItemDto : EntityDto<int>
    {
        public string Name { get; set; }
        public int Qty { get; set; }
    }
}
