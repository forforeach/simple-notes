var App = function () {
    var self = this;

    self.helper = new Helper();
    self.notesVM = new NotesViewModel();
    self.addNoteVM = new AddNoteViewModel();
    self.detailsNoteVM = new AddNoteViewModel();

    // applying knockout bindings
    self.applyBindings = function () {
        self.helper.applyBindings('#notes-list', self.notesVM);
        self.helper.applyBindings('#add-note', self.addNoteVM);
        self.helper.applyBindings('#details-note', self.detailsNoteVM);
    };
    // mapping application routes
    self.routes = new Sammy('#simple-notes', function () {
        // routes
        // main route - list of notes
        this.get('#/notes', function (context) {
            self.helper.getNotes(self.notesVM.notes);
            self.helper.activatePage('#notes-list');
        });

        // get add route - add page
        this.get('#/notes/add', function (context) {
            self.helper.activatePage('#add-note');
        });
        // put add route - add new item
        this.put('#/notes/add', function (context) {
            var me = this;
            $.post('/api/notes', self.addNoteVM.note(), function (id) {
                console.log('New item id: ' + id);
                self.addNoteVM.note(new Note());
                me.redirect('#/notes');
            });
        });

        // get edit route - edit page
        this.get('#/notes/edit/:id', function (context) {
            var note = self.helper.findNoteById(self.notesVM.notes(), context.params.id);
            if (note) {
                self.addNoteVM.note(note);
                this.app.runRoute('get', '#/notes/add');
            }
            else
                this.app.runRoute('get', '#/notes/add')
        });
        // put edit route - update item
        this.put('#/notes/edit/:id', function (context) {
            var me = this;
            $.ajax({
                url: '/api/notes/' + context.params.id,
                type: 'PUT',
                data: self.helper.findNoteById(self.notesVM.notes(), context.params.id),
                success: function (id) {
                    self.addNoteVM.note(new Note());
                    me.redirect('#/notes');
                }
            });
        });
        // delete route - remove item
        this.del('#/notes/delete/:id', function (context) {
            var me = this;
            $.ajax({
                url: '/api/notes/' + context.params.id,
                type: 'DELETE',
                success: function (id) {
                    if (id > -1) {
                        self.notesVM.notes($.grep(self.notesVM.notes(), function (item) {
                            return item.id() != context.params.id;
                        }));
                    }
                    else {
                        self.notesVM.notes([]);
                    }
                    me.redirect('#/notes');
                }
            });
        });
        // get details route - details page
        this.get('#/notes/details/:id', function (context) {
            var note = self.helper.findNoteById(self.notesVM.notes(), context.params.id);
            if (note) {
                self.detailsNoteVM.note(note);
                self.helper.activatePage('#details-note');
            }
            else
                this.app.runRoute('get', '#/notes')
        });

        // empty route will run a main route (default)
        this.get('', function () {
            this.app.runRoute('get', '#/notes')
        });
    });

    //Init app
    self.run = function () {
        $.when(self.helper.getNotes(self.notesVM.notes)).then(function () {
            self.applyBindings();
            self.routes.run();
        });
    };

    return {
        run: self.run,
        routes: self.routes
    };

}();

App.run();