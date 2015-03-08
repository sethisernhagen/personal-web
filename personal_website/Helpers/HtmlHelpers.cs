using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace personal_website.Helpers
{
    public static class HtmlHelpers
    {
        public static string MakeActiveClassAction(this UrlHelper urlHelper, string action)
        {
            string result = "active";

            string actionName = urlHelper.RequestContext.RouteData.Values["action"].ToString();

            if (!actionName.Equals(action, StringComparison.OrdinalIgnoreCase))
            {
                result = null;
            }

            return result;
        }

    }
}