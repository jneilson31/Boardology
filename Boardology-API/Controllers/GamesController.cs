﻿using AutoMapper;
using Boardology.API.Data;
using Boardology.API.Dtos;
using Boardology.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Boardology.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly IBoardologyRepository _repo;
        private readonly IMapper _mapper;

        public GamesController(IBoardologyRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetGames()
        {
            var games = await _repo.GetGames();
            return Ok(games);
        }

        [HttpGet("{gameId}/game")]
        public async Task<IActionResult> GetGame(int gameId)
        {
            var gameFromRepo = await _repo.GetGame(gameId);

            return Ok(gameFromRepo);
        }



        [HttpGet("search")]
        public async Task<IActionResult> GetSearchResults([FromQuery] string search)
        {
            var games = await _repo.GetSearchResults(search);

            return Ok(games);
        }

       

    }
}
