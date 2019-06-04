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
	    private readonly IBoardologyRepository _boardologyRepo;
        private readonly IVotesRepository _votesRepo;
        private readonly IMapper _mapper;

        public VotesController(IVotesRepository votesRepo, IBoardologyRepository boardologyRepo, IMapper mapper)
        {
            _boardologyRepo = boardologyRepo;
	        _votesRepo = votesRepo;
            _mapper = mapper;
        }

        // [Authorize]
        [HttpPost("{userId}/{gameId}/upvote")]
        public async Task<IActionResult> UpvoteGame(int userId, int gameId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            
            if (await _boardologyRepo.GetGame(gameId) == null)
            {
                return NotFound();
            }

            var upvote = await _votesRepo.GetUpvote(userId, gameId);
            var downvote = await _votesRepo.GetDownvote(userId, gameId);

            if (upvote != null)
            {
                
                await _votesRepo.DecreaseUpvotes(gameId);
                _boardologyRepo.Delete(upvote);
                if (await _boardologyRepo.SaveAll())
                {
                    return Ok();
                }
                return BadRequest("Failed to remove upvote");
            }

            

            upvote = new Upvote
            {
                UpVoterId = userId,
                GameId = gameId
            };

            _boardologyRepo.Add(upvote);

            await _votesRepo.IncreaseUpvotes(gameId);

            if (downvote != null)
            {
                await _votesRepo.DecreaseDownvotes(gameId);
                _boardologyRepo.Delete(downvote);
            }


            if (await _boardologyRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to upvote game");
        }

        // [Authorize]
        [HttpPost("{userId}/{gameId}/downvote")]
        public async Task<IActionResult> DownvoteGame(int userId, int gameId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            if (await _boardologyRepo.GetGame(gameId) == null)
            {
                return NotFound();
            }

            var upvote = await _votesRepo.GetUpvote(userId, gameId);
            var downvote = await _votesRepo.GetDownvote(userId, gameId);

            if (downvote != null)
            {
                await _votesRepo.DecreaseDownvotes(gameId);
                _boardologyRepo.Delete(downvote);
                if (await _boardologyRepo.SaveAll())
                {
                    return Ok();
                }
                return BadRequest("Failed to remove upvote");
            }

            downvote = new Downvote
            {
                DownVoterId = userId,
                GameId = gameId
            };

            _boardologyRepo.Add(downvote);

            await _votesRepo.IncreaseDownvotes(gameId);

            if (upvote != null)
            {
                await _votesRepo.DecreaseUpvotes(gameId);
                _boardologyRepo.Delete(upvote);
            }

            if (await _boardologyRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to downvote game");
        }

        [Authorize]
        [HttpGet("{userId}/downvotes")]
        public async Task<IActionResult> GetDownvotes(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var downvotes = await _votesRepo.GetDownvotesForUser(userId);

            return Ok(downvotes);
        }

        [Authorize]
        [HttpGet("{userId}/upvotes")]
        public async Task<IActionResult> GetUpvotes(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var upvotes = await _votesRepo.GetUpvotesForUser(userId);

            return Ok(upvotes);
        }
    }
}
