using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Sammyjs.Models
{
    public class NotesContext : DbContext
    {
        public NotesContext()
        { }

        public DbSet<Note> Notes { get; set; }
    }
}