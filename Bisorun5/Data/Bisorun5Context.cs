using Bisorun5.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bisorun5.Data
{
    public class Bisorun5Context : DbContext
    {
        public Bisorun5Context(DbContextOptions<Bisorun5Context> options)
            : base(options)
        {
        }

       
        public DbSet<Question> Questions { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
