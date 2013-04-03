function Helper() { };

Helper.prototype = function () {
    var self = this;
    // parsing notes list and mapping it into observables
    self.parseNotes = function (data) {
        var array = [];
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            array.push(new Note(item.Title, item.Content, item.Done, item.Id));
        }
        return array;
    };

    // grab notes list from server
    self.getNotes = function (notes) {
        return $.get('/api/notes', function (data) {
            notes(self.parseNotes(data));
        });
    }

    self.findNoteById = function (notes, id) {
        var note = $.grep(notes, function (item) {
            return item.id() == id;
        });
        return note[0];
    };

    // activate current page by route
    self.activatePage = function (selector) {
        $('.active-page').removeClass('active-page');
        $(selector).addClass('active-page');
    };
    // applying knockout bindings
    self.applyBindings = function (placeHolderSelector, vm) {
        var placeHolder = $(placeHolderSelector)[0];
        if (placeHolder) {
            ko.applyBindings(vm, placeHolder);
        }
    };
    return {
        run: self.run,
        parseNotes: self.parseNotes,
        activatePage: self.activatePage,
        applyBindings: self.applyBindings,
        findNoteById: self.findNoteById,
        getNotes: self.getNotes
    };
}();