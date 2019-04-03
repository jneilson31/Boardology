using Boardology.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boardology.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Upvote> Upvotes { get; set; }
        public DbSet<Downvote> Downvotes { get; set; }
        public DbSet<Collection> Collections { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Upvote>()
                .HasKey(k => new { k.UpVoterId, k.GameId });

            builder.Entity<Upvote>()
                .HasOne(u => u.Game);

            builder.Entity<Downvote>()
                .HasKey(k => new { k.DownVoterId, k.GameId });

            builder.Entity<Downvote>()
                .HasOne(u => u.Game);

            builder.Entity<Collection>()
                .HasKey(k => new { k.UserId, k.GameId });

            builder.Entity<Collection>()
                .HasOne(k => k.User)
                .WithMany(k => k.Collections)
                .HasForeignKey(k => k.UserId);

            builder.Entity<Collection>()
                .HasOne(k => k.Game)
                .WithMany(k => k.Collections)
                .HasForeignKey(k => k.GameId);

            builder.Entity<Wishlist>()
                .HasKey(k => new { k.UserId, k.GameId });

            builder.Entity<Wishlist>()
                .HasOne(k => k.User)
                .WithMany(k => k.Wishlists)
                .HasForeignKey(k => k.UserId);

            builder.Entity<Wishlist>()
                .HasOne(k => k.Game)
                .WithMany(k => k.Wishlists)
                .HasForeignKey(k => k.GameId);



        }
    }
}
