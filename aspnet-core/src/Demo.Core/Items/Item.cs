using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Demo.Authorization.Users;
using System;

namespace Demo.Products
{
    public class Item : Entity<int>
    {
        public string Name { get; set; }
        public int Qty { get; set; }
    }
}
