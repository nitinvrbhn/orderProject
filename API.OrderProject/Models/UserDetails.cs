using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.OrderProject.Models
{
    public class UserDetails: UserCredentials
    {
        public int pageNumber { get; set; }
    }
}