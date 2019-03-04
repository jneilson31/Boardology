using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Models;
using Newtonsoft.Json;

namespace Boardology.API.Data
{
    public class SeedUsers
    {
        private readonly DataContext _context;

        public SeedUsers(DataContext context)
        {
            _context = context;
        }

        public void SeedBoardologyUsers()
        {
            var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach (var user in users)
            {
                _context.Users.Add(user);
            }

            _context.SaveChanges();
        }
    }
}
