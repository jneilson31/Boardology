using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Boardology.API.Data
{
	public class WishlistRepository : IWishlistRepository
	{
		private readonly DataContext _context;

		public WishlistRepository(DataContext context)
		{
			_context = context;
		}

		public async Task<IList> GetWishlist(int userId)
		{

			var wishlist = await
				(from wishlists in _context.Wishlists
					join games in _context.Games
						on wishlists.GameId equals games.Id
					where wishlists.UserId == userId
					select new
					{
						games.Id,
						games.Name,
						games.PhotoUrl
					}).ToListAsync();


			return wishlist;
		}

		public async Task<Wishlist> GetWishlistItem(int userId, int gameId)
		{
			var value = await _context.Wishlists.FirstOrDefaultAsync(u => u.UserId == userId && u.GameId == gameId);
			return value;
		}

	}
}
