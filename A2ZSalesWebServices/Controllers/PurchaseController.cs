using A2ZSalesDataAccessLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace A2ZSalesWebServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PurchaseController : Controller
    {
        [HttpGet]
        public JsonResult GetPurchaseDetailsByEmailId(string emailId)
        {
            try
            {
                var dal = new A2ZSalesRepository();
                var purchaseList = dal.DisplayPurchaseDetailsByCustomer(emailId);

                var purchases = new List<Models.PurchaseDetail>();
                if (purchaseList.Any())
                {
                    foreach (var purchase in purchaseList)
                    {
                        var purchaseObj = new Models.PurchaseDetail();
                        purchaseObj.PurchaseId = purchase.PurchaseId;
                        purchaseObj.EmailId = purchase.EmailId;
                        purchaseObj.ProductId = purchase.ProductId;
                        purchaseObj.ProductName = purchase.Product.ProductName;
                        purchaseObj.QuantityPurchased = purchase.QuantityPurchased;
                        purchaseObj.PurchaseDate = purchase.DateOfPurchase.ToShortDateString();
                        purchases.Add(purchaseObj);
                    }
                }
                return Json(purchases);
            }
            catch (Exception ex)
            {
                return Json(null);
            }
        }
    }
}
