using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boardology.API.Models
{
    public class User : IdentityUser<int>
    {
        public byte[] PasswordSalt { get; set; }
        public DateTime DateJoined { get; set; } = DateTime.Today;
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Collection> Collections { get; set; }
        public ICollection<Wishlist> Wishlists { get; set; }
    }
}
