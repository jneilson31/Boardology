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
    public class GamesController : ControllerBase
    {
        private readonly IBoardologyRepository _repo;
        private readonly IMapper _mapper;

        public GamesController(IBoardologyRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetGames()
        {
            var games = await _repo.GetGames();
            return Ok(new
            {
                games = games
            });
        }

        [HttpGet("{gameId}/game")]
        public async Task<IActionResult> GetGame(int gameId)
        {
            var gameFromRepo = await _repo.GetGame(gameId);

            return Ok(gameFromRepo);
        }



        [HttpGet("search")]
        public async Task<IActionResult> GetSearchResults([FromQuery] string search)
        {
            var games = await _repo.GetSearchResults(search);

            return Ok(games);
        }

        [Authorize]
        [HttpGet("{userId}/collection")]
        public async Task<IActionResult> GetCollection(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var collection = await _repo.GetCollection(userId);

            return Ok(collection);
        }

        [Authorize]
        [HttpPost("{userId}/{gameId}/collection")]
        public async Task<IActionResult> AddToCollection(int userId, int gameId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            

            if (await _repo.GetCollectionItem(userId, gameId) != null)
            {
                return BadRequest("This item is already in your collection");
            }

            var collection = new Collection
            {
                UserId = userId,
                GameId = gameId
            };

            _repo.Add(collection);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to add to collection");
        }

        [Authorize]
        [HttpDelete("{userId}/{gameId}/collection")]
        public async Task<IActionResult> DeleteFromCollection(int userId, int gameId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var collectionItem = await _repo.GetCollectionItem(userId, gameId);

            if (collectionItem == null)
            {
                return NotFound();
            }


            if (collectionItem.UserId != userId)
            {
                return Unauthorized();
            }

            _repo.Delete(collectionItem);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to delete game from collection");
        }

        [Authorize]
        [HttpGet("{userId}/wishlist")]
        public async Task<IActionResult> GetWishlist(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var wishlist = await _repo.GetWishlist(userId);

            return Ok(wishlist);
        }

        [Authorize]
        [HttpPost("{userId}/{gameId}/wishlist")]
        public async Task<IActionResult> AddToWishlist(int userId, int gameId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }


            if (await _repo.GetWishlistItem(userId, gameId) != null)
            {
                return BadRequest("This item is already in your wishlist");
            }

            var wishlist = new Wishlist
            {
                UserId = userId,
                GameId = gameId
            };

            _repo.Add(wishlist);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to add to collection");
        }

        [Authorize]
        [HttpDelete("{userId}/{gameId}/wishlist")]
        public async Task<IActionResult> DeleteFromWishlist(int userId, int gameId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var wishlistItem = await _repo.GetWishlistItem(userId, gameId);

            if (wishlistItem == null)
            {
                return NotFound();
            }


            if (wishlistItem.UserId != userId)
            {
                return Unauthorized();
            }

            _repo.Delete(wishlistItem);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to delete game from wishlist");
        }

    }
}
