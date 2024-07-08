using Abp.Application.Services;
using Abp.Domain.Repositories;
using Demo.Invoices.Dto;

namespace Demo.Invoices
{
    public class InvoiceAppService : CrudAppService<Invoice, InvoiceDto>, IInvoiceAppService
    {
        public InvoiceAppService(IRepository<Invoice, int> repository) : base(repository)
        {
        }
    }
}
