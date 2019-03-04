using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boardology.API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public int UserId { get; set; }

        public Comment()
        {
            Created = DateTime.Now;
        }

    }
}
