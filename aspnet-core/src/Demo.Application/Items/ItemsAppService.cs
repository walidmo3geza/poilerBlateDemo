using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Linq.Extensions;
using Abp.Linq;
using Abp.MultiTenancy;
using Demo.Items.Dto;
using Demo.Products;
using System.Collections.Generic;
using System.Threading.Tasks;
using Demo.Items;
using Abp.UI;
using System;

public class ItemsAppService : AsyncCrudAppService<Item, ItemDto, int, PagedAndSortedResultRequestDto, CreateItemDto, UpdateItemDto>, IItemsAppService
{
    private readonly IUnitOfWorkManager _unitOfWorkManager;
    private readonly ICurrentUnitOfWorkProvider _currentUnitOfWorkProvider;

    public ItemsAppService(
        IRepository<Item, int> repository,
        IUnitOfWorkManager unitOfWorkManager,
        ICurrentUnitOfWorkProvider currentUnitOfWorkProvider)
        : base(repository)
    {
        _unitOfWorkManager = unitOfWorkManager;
        _currentUnitOfWorkProvider = currentUnitOfWorkProvider;
    }

    public override async Task<ItemDto> CreateAsync(CreateItemDto input)
    {
        using (var uow = _unitOfWorkManager.Begin())
        {
            _currentUnitOfWorkProvider.Current.SetTenantId(null);

            var entity = MapToEntity(input);
            await Repository.InsertAsync(entity);
            await uow.CompleteAsync();
            return MapToEntityDto(entity);
        }
    }

    public override async Task<ItemDto> GetAsync(EntityDto<int> input)
    {
        using (var uow = _unitOfWorkManager.Begin())
        {
            _currentUnitOfWorkProvider.Current.SetTenantId(null);

            var entity = await Repository.GetAsync(input.Id);
            await uow.CompleteAsync();

            return MapToEntityDto(entity);
        }
    }

    public override async Task<ItemDto> UpdateAsync(UpdateItemDto input)
    {
        using (var uow = _unitOfWorkManager.Begin())
        {
            _currentUnitOfWorkProvider.Current.SetTenantId(null);

            var entity = await Repository.GetAsync(input.Id);
            MapToEntity(input, entity);
            await Repository.UpdateAsync(entity);
            await uow.CompleteAsync();

            return MapToEntityDto(entity);
        }
    }

    public override async Task DeleteAsync(EntityDto<int> input)
    {
        using (var uow = _unitOfWorkManager.Begin())
        {
            _currentUnitOfWorkProvider.Current.SetTenantId(null);

            await Repository.DeleteAsync(input.Id);
            await uow.CompleteAsync();
        }
    }

    public override async Task<PagedResultDto<ItemDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
    {
        using (var uow = _unitOfWorkManager.Begin())
        {
            _currentUnitOfWorkProvider.Current.SetTenantId(null);

            var query = Repository.GetAll();
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            var items = await AsyncQueryableExecuter.ToListAsync(query.PageBy(input));

            await uow.CompleteAsync();

            return new PagedResultDto<ItemDto>(totalCount, ObjectMapper.Map<List<ItemDto>>(items));
        }
    }
}