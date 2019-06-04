using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Models;

namespace Boardology.API.Data
{
	public interface ICollectionRepository
	{
		Task<IList> GetCollection(int userId);
		Task<Collection> GetCollectionItem(int userId, int gameId);
	}
}
