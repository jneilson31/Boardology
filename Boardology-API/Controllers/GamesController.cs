using AutoMapper;
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

        [HttpGet("{gameId}")]
        public async Task<IActionResult> GetGame(int gameId)
        {
            var gameFromRepo = await _repo.GetGame(gameId);

            return Ok(gameFromRepo);
        }

        [HttpDelete("{gameId}")]
        [Authorize]
        public async Task<IActionResult> DeleteGame(int gameId)
        {
            var gameFromRepo = await _repo.GetGame(gameId);
            if (await _repo.GetGame(gameId) == null)
            {
                return NotFound();
            }

            _repo.Delete(gameFromRepo);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to delete game");
        }

    }
}
