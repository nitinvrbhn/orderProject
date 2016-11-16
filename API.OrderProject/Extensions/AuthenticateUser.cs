using API.OrderProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using Newtonsoft.Json;
using System.Web.Hosting;
using Newtonsoft.Json.Linq;
using System.IO;

namespace API.OrderProject.Extensions
{
    [AttributeUsage(AttributeTargets.All)]
    public class AuthenticateUser: AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext) {
            UserCredentials userCreds = new UserCredentials();
            string fileName = String.Empty;
            try
            {
                dynamic data = JObject.Parse(actionContext.Request.Content.ReadAsStringAsync().Result);
                userCreds.name = data.name;
                userCreds.password = data.password;
                fileName = HostingEnvironment.MapPath("~/App_Data/userDetails.json");
                foreach (var existingUser in JArray.Parse(File.ReadAllText(fileName))) {
                    var tempUser = existingUser.ToObject<UserCredentials>();
                    if (tempUser.name == userCreds.name && tempUser.password == userCreds.password)
                    {
                        return true;
                    }
                }
            }
            catch {
                return false;
            }
            return false;
        }
    }
}