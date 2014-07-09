using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OfflineSample.Controllers
{
    public class OfflineController : Controller
    {
        //
        // GET: /Offline/

        public ActionResult List()
        {
            return View();
        }

        public ActionResult Edit()
        {
            return View();
        }

        public ActionResult Save()
        {
            return View("Edit");
        }

    }
}
