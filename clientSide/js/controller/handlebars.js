function handleBarHelper() {
    this.orderBy = 'priority';
    this.filterBy = '';

    this.renderTodos = () => {
        let source = document.getElementById("notes-template").innerHTML;
        let template = Handlebars.compile(source);

        storage
            .GetNotes(this.orderBy, this.filterBy)
            .then(filteredNotes => this.append('content', template(filteredNotes)))
    };

    this.append = (field, domElement) => {
        document.getElementById(field).innerHTML = domElement;
    };

    // SETer for Order By
    this.setOrderBy = (type) => {
        this.orderBy = type;
    };

    this.setFilterBy = (type) => {
        this.filterBy = type;
    };
}

Handlebars.registerHelper("formatDate", function (datetime, format) {
    if (moment) { 
       return moment(datetime).format(format); 
    }
    else {
        return datetime;
    }
});

Handlebars.registerHelper("checkedIf", function (condition) {
    return (condition) ? "checked" : "";
});

Handlebars.registerHelper("getCounter", function () {
    return filterCounter;
});

Handlebars.registerHelper("markedPriority", function (priority) {
    return '<span class="fa fa-exclamation-triangle checked"></span>'.repeat(+priority);
});

Handlebars.registerHelper("unmarkedPriority", function (priority) {
    return '<span class="fa fa-exclamation-triangle"></span>'.repeat(3 - +priority);
});