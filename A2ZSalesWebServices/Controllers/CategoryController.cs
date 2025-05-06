using A2ZSalesDataAccessLayer;
using A2ZSalesWebServices.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace A2ZSalesWebServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoryController : Controller
    {
        [HttpGet]
        public JsonResult GetCategories()
        {
            try
            {
                var dal = new A2ZSalesRepository();
                var categoryList = dal.GetCategoriesUsingLinq();
                var categories = new List<Category>();
                if (categoryList.Any())
                {
                    foreach (var cat in categoryList)
                    {

                        var category = new Category();
                        category.CategoryId = cat.CategoryId;
                        category.CategoryName = cat.CategoryName;
                        categories.Add(category);
                    }
                }
                return Json(categories);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }

    }
}
