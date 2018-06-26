let services =
    (function (dateUtility) {

        class HandleBarsDelegator {

            constructor(orderBy = 'priority', filterby = '') {
                this.orderBy = orderBy;
                this.filterBy = filterby;
            }

            renderTodos = () => {
                let source = document.getElementById("notes-template").innerHTML;
                let template = Handlebars.compile(source);

                storage
                    .GetNotes(this.orderBy, this.filterBy)
                    .then(filteredNotes => this.append('content', template(filteredNotes)))
            };

            append = (field, domElement) => {
                document.getElementById(field).innerHTML = domElement;
            };

            // SETer for Order By
            setOrderBy = (type) => {
                this.orderBy = type;
            };

            setFilterBy = (type) => {
                this.filterBy = type;
            };
        }

        Handlebars.registerHelper("formatDate", function (datetime, format) {
            if (dateUtility) {
                return dateUtility(datetime).format(format);
            }
            else {
                return datetime;
            }
        });

// checkbox Finished -> gets it's statement by this function
        Handlebars.registerHelper("checkedIf", function (condition) {
            return (condition) ? "checked" : "";
        });

// to show the priority level with exclamation-triangles
        Handlebars.registerHelper("markedPriority", function (priority) {
            return '<span class="fa fa-exclamation-triangle checked">&nbsp;</span>'.repeat(+priority);
        });

        Handlebars.registerHelper("unmarkedPriority", function (priority) {
            return '<span class="fa fa-exclamation-triangle">&nbsp;</span>'.repeat(3 - +priority);
        });

    }(moment));