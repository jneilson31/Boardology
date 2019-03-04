using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Dtos;
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

        public async Task<Upvote> GetUpvote(int userId, int gameId)
        {
            return await _context.Upvotes.FirstOrDefaultAsync(u => u.UpVoterId == userId && u.GameId == gameId);
        }

        public async Task<Downvote> GetDownvote(int userId, int gameId)
        {
            return await _context.Downvotes.FirstOrDefaultAsync(u => u.DownVoterId == userId && u.GameId == gameId);
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

 
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
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

        public async Task<Comment> GetComment(int commentId)
        {
            var comment = await _context.Comments.SingleOrDefaultAsync(u => u.Id == commentId);
            return comment;
        }

        public async Task<IList> GetComments(int gameId)
        {

            var commentList = await
                (from comments in _context.Comments
                 join users in _context.Users
                 on comments.UserId equals users.Id
                 where comments.GameId == gameId
                 select new
                 {
                     comments.Id,
                     comments.GameId,
                     comments.Content,
                     comments.Created,
                     comments.UserId,
                     users.Username
                 }).Take(5).ToListAsync();
                 

            return commentList;

        }
    }
}
