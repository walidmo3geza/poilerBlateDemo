using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo.Invoices
{
    public class Invoice : Entity<int>
    {
        public string InvoiceNumber { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
