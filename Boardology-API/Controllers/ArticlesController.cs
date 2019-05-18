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

        private readonly IBoardologyRepository _repo;
        private readonly IMapper _mapper;

        public ArticlesController(IBoardologyRepository repo, IMapper mapper)
        {
            _repo = repo;
        }


        [HttpGet]
        public async Task<IActionResult> GetArticles()
        {
            var articles = await _repo.GetArticles();

            if (articles == null)
            {
                return NotFound();
            }

            return Ok(articles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetArticle(int id)
        {
            var article = await _repo.GetArticle(id);

            if (article == null)
            {
                return NotFound();
            }

            return Ok(article);
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
            

            if (await _repo.GetArticle(articleId) == null)
            {
                return NotFound();
            }


            comment = new ArticleComment
            {
                UserId = userId,
                ArticleId = articleId,
                Content = comment.Content
            };

            _repo.Add(comment);

            await _repo.IncreaseArticleComments(articleId);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to add comment");
        }


    }
}
