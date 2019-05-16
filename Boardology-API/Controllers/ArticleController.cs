using AutoMapper;
using Boardology.API.Data;
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
    public class ArticleController : ControllerBase
    {

        private readonly IBoardologyRepository _repo;
        private readonly IMapper _mapper;

        public ArticleController(IBoardologyRepository repo, IMapper mapper)
        {
            _repo = repo;
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArticle(int id)
        {
            var article = await _repo.GetArticle(id);

            if (article == null)
            {
                return NotFound();
            }

            return Ok(article);
            }

    }
}
