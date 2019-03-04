using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boardology.API.Models
{
    public class Downvote
    {
        public int DownVoterId { get; set; }
        public int GameId { get; set; }
        public User DownVoter { get; set; }
        public Game Game { get; set; }
    }
}
