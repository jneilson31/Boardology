using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Boardology.API.Data
{
    public class CommentsRepository : ICommentsRepository
    {
        private readonly DataContext _context;

        public CommentsRepository(DataContext context)
        {
            _context = context;
        }


        public async Task IncreaseComments(int gameId)
        {
            var game = await _context.Games.SingleOrDefaultAsync(u => u.Id == gameId);
            if (game != null)
            {
                game.NumReviews = game.NumReviews + 1;
            }
        }

        public async Task DecreaseComments(int gameId)
        {
            var game = await _context.Games.SingleOrDefaultAsync(u => u.Id == gameId);
            if (game != null)
            {
                game.NumReviews = game.NumReviews - 1;
            }
        }


    }
}
