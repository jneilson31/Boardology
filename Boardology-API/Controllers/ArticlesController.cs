using AutoMapper;
using Boardology.API.Data;
using Boardology.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Boardology.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {

        private readonly IBoardologyRepository _boardologyRepo;
	    private readonly IArticlesRepository _articlesRepo;
        private readonly IMapper _mapper;

        public ArticlesController(IBoardologyRepository boardologyRepo, IArticlesRepository articlesRepo, IMapper mapper)
        {
	        _boardologyRepo = boardologyRepo;
	        _articlesRepo = articlesRepo;
			_mapper = mapper;
		}


        [HttpGet]
        public async Task<IActionResult> GetArticles()
        {
            var articles = await _articlesRepo.GetArticles();

            if (articles == null)
            {
                return NotFound();
            }

            return Ok(articles);
        }

        [HttpGet("{id}/article")]
        public async Task<IActionResult> GetArticle(int id)
        {
            var article = await _articlesRepo.GetArticle(id);

            if (article == null)
            {
                return NotFound();
            }

            return Ok(article);
        }
        
        [HttpGet("{articleId}/comments")]
        public async Task<IActionResult> GetArticleComments(int articleId)
        {


            if (await _articlesRepo.GetArticle(articleId) == null)
            {
                return NotFound();
            }

            var comments = await _articlesRepo.GetArticleComments(articleId);

            return Ok(comments);

        }

        [Authorize]
        [HttpPost("{userId}/{articleId}/comment")]
        public async Task<IActionResult> AddComment(int userId, int articleId, ArticleComment comment)
        {

            if (comment == null)
            {
                throw new Exception("No comment");
            }

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            

            if (await _articlesRepo.GetArticle(articleId) == null)
            {
                return NotFound();
            }


            comment = new ArticleComment
            {
                UserId = userId,
                ArticleId = articleId,
                Content = comment.Content
            };

            _boardologyRepo.Add(comment);

            await _articlesRepo.IncreaseArticleComments(articleId);

            if (await _boardologyRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to add comment");
        }

        [Authorize]
        [HttpDelete("user/{userId}/comment/{commentId}/delete")]
        public async Task<IActionResult> DeleteComment(int userId, int commentId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var comment = await _articlesRepo.GetArticleComment(commentId);

            if (comment == null)
            {
                return NotFound();
            }

            if (comment.UserId != userId)
            {
                return Unauthorized();
            }

            _boardologyRepo.Delete(comment);


            if (await _boardologyRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to delete comment");

        }


    }
}
