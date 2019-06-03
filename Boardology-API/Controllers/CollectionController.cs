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
	public class CollectionController : ControllerBase
	{
		private readonly IBoardologyRepository _boardologyRepo;
		private readonly ICollectionRepository _collectionRepo;
		private readonly IMapper _mapper;

		public CollectionController(IBoardologyRepository boardologyRepo, ICollectionRepository collectionRepo, IMapper mapper)
		{
			_boardologyRepo = boardologyRepo;
			_collectionRepo = collectionRepo;
			_mapper = mapper;
		}

		[Authorize]
		[HttpGet("{userId}/collection")]
		public async Task<IActionResult> GetCollection(int userId)
		{
			if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
			{
				return Unauthorized();
			}

			var collection = await _collectionRepo.GetCollection(userId);

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


			if (await _collectionRepo.GetCollectionItem(userId, gameId) != null)
			{
				return BadRequest("This item is already in your collection");
			}

			var collection = new Collection
			{
				UserId = userId,
				GameId = gameId
			};

			_boardologyRepo.Add(collection);

			if (await _boardologyRepo.SaveAll())
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

			var collectionItem = await _collectionRepo.GetCollectionItem(userId, gameId);

			if (collectionItem == null)
			{
				return NotFound();
			}


			if (collectionItem.UserId != userId)
			{
				return Unauthorized();
			}

			_boardologyRepo.Delete(collectionItem);

			if (await _boardologyRepo.SaveAll())
			{
				return Ok();
			}

			return BadRequest("Failed to delete game from collection");
		}

	}
}
