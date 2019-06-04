using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Boardology.API.Data
{
	public interface IWishlistRepository
	{
		Task<IList> GetWishlist(int userId);
		Task<Wishlist> GetWishlistItem(int userId, int gameId);
	}
}
