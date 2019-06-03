using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Boardology.API.Data
{
	public class VotesRepository : IVotesRepository
	{
		private readonly DataContext _context;

		public VotesRepository(DataContext context)
		{
			_context = context;
		}
		public async Task<Upvote> GetUpvote(int userId, int gameId)
		{
			return await _context.Upvotes.FirstOrDefaultAsync(u => u.UpVoterId == userId && u.GameId == gameId);
		}

		public async Task<Downvote> GetDownvote(int userId, int gameId)
		{
			return await _context.Downvotes.FirstOrDefaultAsync(u => u.DownVoterId == userId && u.GameId == gameId);
		}

		public async Task<IList> GetDownvotesForUser(int userId)
		{

			var downvoteList = await
				(from downvotes in _context.Downvotes
					where downvotes.DownVoterId == userId
					select new
					{
						downvotes.GameId
					}).ToListAsync();

			return downvoteList;
		}

		public async Task<IList> GetUpvotesForUser(int userId)
		{
			var upvoterList = await
				(from upvotes in _context.Upvotes
					where upvotes.UpVoterId == userId
					select new
					{
						upvotes.GameId
					}).ToListAsync();

			return upvoterList;
		}

		public async Task<Game> DecreaseUpvotes(int gameId)
		{
			var game = await _context.Games.SingleOrDefaultAsync(u => u.Id == gameId);
			if (game != null)
			{
				game.Upvotes = game.Upvotes - 1;
			}
			return game;
		}

		public async Task<Game> DecreaseDownvotes(int gameId)
		{
			var game = await _context.Games.SingleOrDefaultAsync(u => u.Id == gameId);
			if (game != null)
			{
				game.Downvotes = game.Downvotes - 1;
			}
			return game;
		}

		public async Task<Game> IncreaseUpvotes(int gameId)
		{
			var game = await _context.Games.SingleOrDefaultAsync(u => u.Id == gameId);
			if (game != null)
			{
				game.Upvotes = game.Upvotes + 1;
			}
			return game;
		}

		public async Task<Game> IncreaseDownvotes(int gameId)
		{
			var game = await _context.Games.SingleOrDefaultAsync(u => u.Id == gameId);
			if (game != null)
			{
				game.Downvotes = game.Downvotes + 1;
			}
			return game;
		}

	}
}
