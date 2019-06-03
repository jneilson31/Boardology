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
	public class WishlistController : ControllerBase
	{
		private readonly IBoardologyRepository _boardologyRepo;
		private readonly IWishlistRepository _wishlistRepo;
		private readonly IMapper _mapper;

		public WishlistController(IBoardologyRepository boardologyRepo, IWishlistRepository wishlistRepo, IMapper mapper)
		{
			_boardologyRepo = boardologyRepo;
			_wishlistRepo = wishlistRepo;
			_mapper = mapper;
		}

		
		[Authorize]
		[HttpGet("{userId}/wishlist")]
		public async Task<IActionResult> GetWishlist(int userId)
		{
			if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
			{
				return Unauthorized();
			}

			var wishlist = await _wishlistRepo.GetWishlist(userId);

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


			if (await _wishlistRepo.GetWishlistItem(userId, gameId) != null)
			{
				return BadRequest("This item is already in your wishlist");
			}

			var wishlist = new Wishlist
			{
				UserId = userId,
				GameId = gameId
			};

			_boardologyRepo.Add(wishlist);

			if (await _boardologyRepo.SaveAll())
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

			var wishlistItem = await _wishlistRepo.GetWishlistItem(userId, gameId);

			if (wishlistItem == null)
			{
				return NotFound();
			}


			if (wishlistItem.UserId != userId)
			{
				return Unauthorized();
			}

			_boardologyRepo.Delete(wishlistItem);

			if (await _boardologyRepo.SaveAll())
			{
				return Ok();
			}

			return BadRequest("Failed to delete game from wishlist");
		}

	}
}
