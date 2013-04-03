function NotesViewModel() {
    var self = this;

    //data
    self.notes = ko.observableArray();

    self.remaining = ko.computed(function () {
        var count = 0,
            notes = self.notes();
        for (var i = 0; i < notes.length; i++) {
            if (!notes[i].done())
                count++;
        }
        return count;
    });

    self.remove = function (note) {
        if (App) {
            App.routes.runRoute('delete', '#/notes/delete/' + note.id());
        }
    };
    self.removeAll = function () {
        if (App) {
            App.routes.runRoute('delete', '#/notes/delete/-1');
        }
    };
    self.checked = function (note) {
        if (App) {
            App.routes.runRoute('put', '#/notes/edit/' + note.id());
        }
        return true;
    };
}

function Note(title, content, done, id) {
    var self = this;

    self.title = ko.observable(title);
    self.content = ko.observable(content);
    self.done = ko.observable(done);
    self.id = ko.observable(id);
}
