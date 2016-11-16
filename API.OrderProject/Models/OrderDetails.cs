using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.OrderProject.Models
{
    public class OrderDetails
    {
        public string orderId { get; set; }
        public string state { get; set; }
        public string amount { get; set; }
        public long createdAt { get; set; }
        public CustomerDetails customer;

        public class CustomerDetails
        {
            public string name { get; set; }
            public string phone { get; set; }
            public string address { get; set; }
            public int latitude { get; set; }
            public int longitude { get; set; }
        }
    }
}