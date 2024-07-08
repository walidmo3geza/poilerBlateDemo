namespace Demo.Items
{
    using Abp.Application.Services;
    using Abp.Application.Services.Dto;
    using Demo.Items.Dto;

    public interface IItemsAppService : IAsyncCrudAppService<ItemDto, int, PagedAndSortedResultRequestDto, CreateItemDto, UpdateItemDto>
    {
    }
}
