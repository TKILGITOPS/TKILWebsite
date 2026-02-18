using Microsoft.AspNetCore.Mvc;

namespace TkilWebsite.Controllers
{
        public class HomeController : Controller
        {
            public IActionResult Index() => View();
            public IActionResult About() => View();
            public IActionResult Services() => View();
            public IActionResult Projects() => View();
            public IActionResult Capabilities() => View();
            public IActionResult Contact() => View();
        }
    }

