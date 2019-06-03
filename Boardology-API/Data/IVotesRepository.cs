using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Models;

namespace Boardology.API.Data
{
	public interface IVotesRepository
	{
		Task<Upvote> GetUpvote(int userId, int gameId);
		Task<Downvote> GetDownvote(int userId, int gameId);
		Task<IList> GetDownvotesForUser(int userId);
		Task<IList> GetUpvotesForUser(int userId);
		Task<Game> DecreaseUpvotes(int gameId);
		Task<Game> DecreaseDownvotes(int gameId);
		Task<Game> IncreaseUpvotes(int gameId);
		Task<Game> IncreaseDownvotes(int gameId);
	}
}
