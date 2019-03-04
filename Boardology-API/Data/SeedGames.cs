using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Models;
using Newtonsoft.Json;

namespace Boardology.API.Data
{
    public class SeedGames
    {
        private readonly DataContext _context;

        public SeedGames(DataContext context)
        {
            _context = context;
        }

        public void SeedBoardGames()
        {
            var gameData = System.IO.File.ReadAllText("Data/GameSeedData.json");
            var games = JsonConvert.DeserializeObject<List<Game>>(gameData);
            foreach (var game in games)
            {
                _context.Games.Add((game));
            }

            _context.SaveChanges();
        }
    }
}
