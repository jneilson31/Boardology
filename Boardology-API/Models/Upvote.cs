using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boardology.API.Models
{
    public class Upvote
    {
        public int UpVoterId { get; set; }
        public int GameId { get; set; }
        public User UpVoter { get; set; }
        public Game Game { get; set; }
    }
}
