using Microsoft.AspNetCore.Mvc;

namespace TkilWebsite.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult NewsDownloads()
        {
            return View();
        }

        public IActionResult Enquiry()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Enquiry(string Division, string Product, string Message,
                              string Name, string Address, string Email,
                              string Phone, string City, bool Consent)
        {
            // TODO: save to DB or send email
            TempData["Success"] = "Thank you! Your enquiry has been submitted.";
            return RedirectToAction("Enquiry");
        }

        public IActionResult Careers()
        {
            return View();
        }

        public IActionResult Sitemap()
        {
            return View();
        }

        public IActionResult Contact()
        {
            return View();
        }
        public IActionResult Company()
        {
            return View();
        }

        public IActionResult Divisions()
        {
            return View();
        }

        public IActionResult Products()
        {
            return View();
        }

        public IActionResult Design()
        {
            return View();
        }

        public IActionResult Manufacturing()
        {
            return View();
        }

        public IActionResult ErectionCommissioning()
        {
            return View();
        }

    }

}

