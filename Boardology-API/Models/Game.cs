﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boardology.API.Models
{
    public class Game
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Upvotes { get; set; }
        public int Downvotes { get; set; }
        public int NumReviews { get; set; }
        public string NumPlayers { get; set; }
        public string TimeToPlay { get; set; }
        public string AgeSuggestion { get; set; }
        public int YearCreated { get; set; }
        public string PhotoUrl { get; set; }
        public string Category { get; set; }
        public ICollection<Collection> Collections { get; set; }
        public ICollection<Wishlist> Wishlists { get; set; }
    }
}
