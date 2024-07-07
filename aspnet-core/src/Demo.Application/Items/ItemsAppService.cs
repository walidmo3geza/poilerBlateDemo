using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Demo.Authorization;
using Demo.Items.Dto;
using Demo.Products;

namespace Demo.Items
{
    public class ItemsAppService : CrudAppService<Item, ItemDto>
    {
        public ItemsAppService(IRepository<Item, int> repository) : base(repository)
        {
        }
    }
}
