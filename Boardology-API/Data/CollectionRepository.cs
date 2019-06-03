using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Boardology.API.Data
{
	public class CollectionRepository : ICollectionRepository
	{
		private readonly DataContext _context;

		public CollectionRepository(DataContext context)
		{
			_context = context;
		}

		public async Task<IList> GetCollection(int userId)
		{

			var collectionList = await
				(from collections in _context.Collections
					join games in _context.Games
						on collections.GameId equals games.Id
					where collections.UserId == userId
					select new
					{
						games.Id,
						games.Name,
						games.PhotoUrl
					}).ToListAsync();


			return collectionList;
		}

		public async Task<Collection> GetCollectionItem(int userId, int gameId)
		{
			var value = await _context.Collections.FirstOrDefaultAsync(u => u.UserId == userId && u.GameId == gameId);
			return value;
		}


	}
}
