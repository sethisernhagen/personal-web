using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(personal_website.Startup))]
namespace personal_website
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
