using AutoMapper;
using Boardology.API.Data;
using Boardology.API.Dtos;
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
    public class CommentsController : ControllerBase
    {

        private readonly IBoardologyRepository _repo;
        private readonly IMapper _mapper;

        public CommentsController(IBoardologyRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("game/{gameId}")]
        public async Task<IActionResult> GetComments(int gameId)
        {

            if (await _repo.GetGame(gameId) == null)
            {
                return NotFound();
            }

            var comments = await _repo.GetComments(gameId);

            return Ok(comments);

        }

        [HttpGet("comment/{commentId}")]
        public async Task<IActionResult> GetComment(int commentId)
        {

            if (await _repo.GetGame(commentId) == null)
            {
                return NotFound();
            }

            var comment = await _repo.GetComment(commentId);

            return Ok(comment);

        }

        [Authorize]
        [HttpPost("{userId}/{gameId}")]
        public async Task<IActionResult> AddComment(int userId, int gameId, Comment comment)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            if (await _repo.GetGame(gameId) == null)
            {
                return NotFound();
            }

            comment = new Comment
            {
                UserId = userId,
                GameId = gameId,
                Content = comment.Content
            };

            _repo.Add(comment);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to add comment");

        }


        [Authorize]
        [HttpDelete("user/{userId}/comment/{commentId}")]
        public async Task<IActionResult> DeleteComment(int userId, int commentId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var comment = await _repo.GetComment(commentId);

            if (comment == null)
            {
                return NotFound();
            }

            if (comment.UserId != userId)
            {
                return Unauthorized();
            }

            _repo.Delete(comment);


            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to delete comment");

        }
    }
}
