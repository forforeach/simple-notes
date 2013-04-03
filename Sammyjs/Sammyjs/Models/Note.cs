using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sammyjs.Models
{
    public class Note
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public bool Done { get; set; }
        public int Id { get; set; }
    }
}