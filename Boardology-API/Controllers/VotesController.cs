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
    public class VotesController : ControllerBase
    {

        private readonly IBoardologyRepository _repo;
        private readonly IMapper _mapper;

        public VotesController(IBoardologyRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [Authorize]
        [HttpPost("upvote/{userId}/{gameId}")]
        public async Task<IActionResult> UpvoteGame(int userId, int gameId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var upvote = await _repo.GetUpvote(userId, gameId);

            if (upvote != null)
            {
                return BadRequest("You already upvoted this game");
            }

            if (await _repo.GetGame(gameId) == null)
            {
                return NotFound();
            }

            upvote = new Upvote
            {
                UpVoterId = userId,
                GameId = gameId
            };

            _repo.Add(upvote);

            await _repo.IncreaseUpvotes(gameId);


            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to upvote game");
        }

        [Authorize]
        [HttpPost("downvote/{userId}/{gameId}")]
        public async Task<IActionResult> DownvoteGame(int userId, int gameId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var downvote = await _repo.GetDownvote(userId, gameId);

            if (downvote != null)
            {
                return BadRequest("You already downvoted this game");
            }

            if (await _repo.GetGame(gameId) == null)
            {
                return NotFound();
            }

            downvote = new Downvote
            {
                DownVoterId = userId,
                GameId = gameId
            };

            _repo.Add(downvote);

            await _repo.IncreaseDownvotes(gameId);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to downvote game");
        }
    }
}
