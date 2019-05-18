﻿using Boardology.API.Dtos;
using Boardology.API.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boardology.API.Data
{
    public interface IBoardologyRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<Game>> GetGames();
        Task<Game> GetGame(int gameId);
        Task<Upvote> GetUpvote(int userId, int gameId);
        Task<Downvote> GetDownvote(int userId, int gameId);
        Task<Game> IncreaseUpvotes(int gameId);
        Task<Game> IncreaseDownvotes(int gameId);
        Task<Comment> GetComment(int commentId);
        Task<IList> GetComments(int gameId);
        Task<IList<Game>> GetSearchResults(string game);
        Task<IList> GetCollection(int userId);
        Task<Collection> GetCollectionItem(int userId, int gameId);
        Task<IList> GetWishlist(int userId);
        Task<Wishlist> GetWishlistItem(int userId, int gameId);
        Task<IList> GetDownvotesForUser(int userId);
        Task<IList> GetUpvotesForUser(int userId);
        Task<Game> DecreaseUpvotes(int gameId);
        Task<Game> DecreaseDownvotes(int gameId);
        Task<List<Article>> GetArticles();
        Task<Article> GetArticle(int id);
    }
}
