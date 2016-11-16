using API.OrderProject.Extensions;
using API.OrderProject.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace API.OrderProject.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [RoutePrefix("api/Order")]
    public class OrderController : ApiController
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="creds"></param>
        /// <returns></returns>
        [Route("Authenticate")]
        [HttpPost]
        public IHttpActionResult AuthenticateUser(UserCredentials creds)
        {
            string fileName = String.Empty;
            try
            {
                fileName = HostingEnvironment.MapPath("~/App_Data/userDetails.json");
                foreach (var existingUser in JArray.Parse(File.ReadAllText(fileName)))
                {
                    var tempUser = existingUser.ToObject<UserCredentials>();
                    if (tempUser.name == creds.name && tempUser.password == creds.password)
                    {
                        return Ok(true);
                    }
                }
            }
            catch
            {
                return BadRequest();
            }
            return Unauthorized();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="creds"></param>
        /// <returns></returns>
        [Route("getAllData")]
        [HttpPost]
        [AuthenticateUser]
        public IHttpActionResult GetData(UserCredentials creds) {
            string fileName = String.Empty;
            try
            {
                fileName = HostingEnvironment.MapPath("~/App_Data/sample-order-dump.json");
            }
            catch {
                return NotFound();
            }
            return Ok(JArray.Parse(File.ReadAllText(fileName)));
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="details"></param>
        /// <returns></returns>
        [Route("getNextData")]
        [HttpPost]
        [AuthenticateUser]
        public IHttpActionResult GetNextData(UserDetails details)
        {
            string fileName = String.Empty;
            int index = 0;
            int numberPerPage = 10;
            List<OrderDetails> orderDetails = new List<OrderDetails>();
            try
            {
                fileName = HostingEnvironment.MapPath("~/App_Data/sample-order-dump.json");
                foreach (var existingUser in JArray.Parse(File.ReadAllText(fileName)))
                {
                    if ((index >= ((details.pageNumber - 1) * numberPerPage)) && (index < ((details.pageNumber) * numberPerPage)))
                    {
                        orderDetails.Add(existingUser.ToObject<OrderDetails>());
                    }
                    index++;
                }
            }
            catch
            {
                return NotFound();
            }
            return Ok(orderDetails);
        }
    }
}
