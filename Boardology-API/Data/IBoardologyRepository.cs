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
        Task<Comment> GetComment(int commentId);
        Task<IList> GetComments(int gameId);
        Task<IList<Game>> GetSearchResults(string game);
    }
}
