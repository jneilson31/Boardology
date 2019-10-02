using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Dtos;
using Boardology.API.Helpers;
using Boardology.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Boardology.API.Data
{
    public class BoardologyRepository : IBoardologyRepository
    {
        private readonly DataContext _context;

        public BoardologyRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
	    public async Task<bool> SaveAll()
	    {
		    return await _context.SaveChangesAsync() > 0;
	    }

		public async Task<Game> GetGame(int id)
        {
            var game = await _context.Games.FirstOrDefaultAsync(u => u.Id == id);
            return game;
        }

        public async Task<IEnumerable<Game>> GetGames()
        {
            var games = await _context.Games.ToListAsync();
            return games;

        }


        public async Task<Comment> GetComment(int commentId)
        {
            var comment = await _context.Comments.SingleOrDefaultAsync(u => u.Id == commentId);
            return comment;
        }

        public async Task<PagedList<CommentDto>> GetComments(int gameId, CommentParams commentParams)
        {

            var commentList =
                (from comments in _context.Comments
                 join users in _context.Users
                 on comments.UserId equals users.Id
                 where comments.GameId == gameId
                 orderby comments.Created descending
                 select new CommentDto
                 {
                     Id = comments.Id,
                     GameId = comments.GameId,
                     Content = comments.Content,
                     Created = comments.Created,
                     UserId = comments.UserId,
                     UserName = users.UserName
                 });
                 

            return await PagedList<CommentDto>.CreateAsync(commentList, commentParams.PageNumber, commentParams.PageSize);

        }

		// This method is only to be used if we want to get search results from the back end. Depends on how many products we have
        public async Task<IList<Game>> GetSearchResults(string searchString)
        {
            List<Game> games = new List<Game>();

            if (!String.IsNullOrEmpty(searchString))
            {
                 games = await (from g in _context.Games
                                   where g.Name.IndexOf(searchString, StringComparison.OrdinalIgnoreCase) >= 0
                                   select g).ToListAsync();
            }
            return games;
        }


    }
}
