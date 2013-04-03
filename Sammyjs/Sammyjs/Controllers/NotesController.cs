using Sammyjs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sammyjs.Controllers
{
    public class NotesController : ApiController
    {
        // GET api/notes
        public IEnumerable<Note> Get()
        {
            using (var context = new NotesContext())
            {
                return context.Notes.ToList<Note>();
            }
        }

        // POST api/notes
        public int Post(Note note)
        {
            using (var context = new NotesContext())
            {
                context.Notes.Add(note);
                context.SaveChanges();
                return note.Id;
            }
        }

        // PUT api/notes/5
        public void Put(int id, Note note)
        {
            using (var context = new NotesContext())
            {
                var oldNote = context.Notes.Find(id);
                oldNote.Title = note.Title;
                oldNote.Content = note.Content;
                oldNote.Done = note.Done;
                context.SaveChanges();
            }
        }

        // DELETE api/notes/5
        public void Delete(int id)
        {
            using (var context = new NotesContext())
            {
                if (id > -1)
                {
                    var note = context.Notes.Find(id);
                    context.Notes.Remove(note);
                    context.SaveChanges();
                }
                else
                {
                    foreach (var note in context.Notes)
                        context.Notes.Remove(note);
                    context.SaveChanges();
                }
            }
        }

    }
}