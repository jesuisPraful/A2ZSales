using A2ZSalesDataAccessLayer;
using A2ZSalesDataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace A2ZSalesWebServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RatingController : Controller
    {
        [HttpGet]
        public JsonResult DisplayAllReviewDetailsByEmailId(string emailId)
        {
            try
            {
                var dal = new A2ZSalesRepository();
                var ratingList = dal.DisplayAllReviewDetailsByCustomer(emailId);
                var rating = new Models.Rating();
                var ratings = new List<Models.Rating>();
                if (ratingList.Any())
                {
                    foreach (var rate in ratingList)
                    {
                        rating.EmailId = rate.EmailId;
                        rating.ProductId = rate.ProductId;
                        rating.ProductName = rate.ProductName;
                        rating.ReviewComments = rate.ReviewComments;
                        rating.ReviewRating = rate.ReviewRating;

                        ratings.Add(rating);
                    }
                }
                return Json(ratings);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost]
        public bool InsertRating(Models.Rating rating)
        {
            bool status = false;
            try
            {
                Rating ratings = new Rating();
                ratings.EmailId = rating.EmailId;
                ratings.ProductId = rating.ProductId;
                ratings.ProductName = rating.ProductName;
                ratings.ReviewRating = (byte)rating.ReviewRating;
                ratings.ReviewComments = rating.ReviewComments;
                var dal = new A2ZSalesRepository();
                status = dal.AddRatings(ratings);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpGet]
        public JsonResult GetProductReviewByCustomer(string emailId, string productId)
        {
            var rating = new Models.Rating();
            try
            {
                var dal = new A2ZSalesRepository();
                var rate = dal.GetProductReviewByCustomer(emailId, productId);

                rating.EmailId = rate.EmailId;
                rating.ProductId = rate.ProductId;
                rating.ProductName = rate.ProductName;
                rating.ReviewRating = rate.ReviewRating;
                rating.ReviewComments = rate.ReviewComments;

            }
            catch (Exception ex)
            {
                rating = null;
            }
            return Json(rating);
        }

        [HttpPut]
        public bool UpdateReviewComments(Models.Rating rating)
        {
            bool status = false;
            try
            {
                var dal = new A2ZSalesRepository();
                status = dal.UpdateReviewComments(rating.EmailId, rating.ProductId, rating.ReviewComments);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        [HttpDelete]
        public bool DeleteRating(Models.Rating rating)
        {
            var status = false;
            try
            {
                var dal = new A2ZSalesRepository();
                status = dal.DeleteRating(rating.EmailId, rating.ProductId);
            }
            catch (Exception ex)
            {
                status = false;
            }
            return status;
        }

    }
}
