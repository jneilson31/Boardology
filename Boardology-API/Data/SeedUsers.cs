using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boardology.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace Boardology.API.Data
{
    public class SeedUsers
    {
        private readonly UserManager<User> _userManager;

        public SeedUsers(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        //public void SeedBoardologyUsers()
        //{
        //    if (!_userManager.Users.Any())
        //    {

        //    }
        //    var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
        //    var users = JsonConvert.DeserializeObject<List<User>>(userData);
        //    foreach (var user in users)
        //    {
        //        _context.Users.Add(user);
        //    }

        //    _context.SaveChanges();
        //}
    }
}
