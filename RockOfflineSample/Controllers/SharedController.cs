

using System.Web.Mvc;

namespace OfflineSample.Controllers
{
    public class SharedController : Controller
    {
        public ActionResult AppCacheManifest()
        {
            //var url = new UrlHelper(Request.RequestContext);
            //var images = Directory.EnumerateFiles(Server.MapPath("~\\Content\\img\\")).Select(x => x.Split("\\")[]).ToList();
            //url.Content("~/Content/img/");
            return View();
        }
    }
}