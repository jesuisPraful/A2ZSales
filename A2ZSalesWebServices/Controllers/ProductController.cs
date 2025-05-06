using A2ZSalesDataAccessLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace A2ZSalesWebServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : Controller
    {
        [HttpGet]
        public JsonResult GetProducts()
        {
            try
            {
                var dal = new A2ZSalesRepository();
                var productList = dal.DisplayProductDetails();
                var products = new List<Models.Product>();
                if (productList.Any())
                {
                    foreach (var prod in productList)
                    {
                        var product = new Models.Product();
                        product.ProductId = prod.ProductId;
                        product.ProductName = prod.ProductName;
                        product.CategoryId = prod.CategoryId;
                        product.Price = prod.Price;
                        product.QuantityAvailable = prod.QuantityAvailable;

                        products.Add(product);
                    }
                }
                return Json(products);
            }
            catch (Exception)
            {
                return Json(null);
            }

        }

    }
}
