using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GoogleMaps.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			//Find Location on Map
			return View();
		}

		public ActionResult StaticMap()
		{
			return View();
		}

		public ActionResult Geolocation()
		{
			return View();
		}

		public ActionResult CalculateDistance()
		{
			return View();
		}

		public ActionResult NearBy()
		{
			return View();
		}
	}
}