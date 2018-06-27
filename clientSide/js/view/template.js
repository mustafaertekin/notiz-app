let templates =
    (function (mmt, $, hbs) {

        class HandleBarsDelegator
        {
            constructor() {}

            render(list, orderBy){
                let source = $("#notes-template").html();
                let template = hbs.compile(source);
                $('#content').html(template({list, orderBy}));
            };
        }

        hbs.registerHelper("formatDate", function (datetime, format) {
            return mmt ? mmt(datetime).format(format) : datetime;
        });

        // checkbox Finished -> gets it's statement by this function
        hbs.registerHelper("checkedIf", function (condition) {
            return (condition) ? "checked" : "";
        });

        // to show the priority level with exclamation-triangles
        hbs.registerHelper("markedPriority", function (priority) {
            return '<span class="fa fa-exclamation-triangle checked">&nbsp;</span>'.repeat(+priority);
        });

        hbs.registerHelper("unmarkedPriority", function (priority) {
            return '<span class="fa fa-exclamation-triangle">&nbsp;</span>'.repeat(3 - +priority);
        });

        // prints the selected order type to the top of render-list
        hbs.registerHelper("OrderBy", function (orderBy) {
            if (orderBy === "dueDate") {
                return "Due date"
            }
            if (orderBy === "createdDate"){
                return "Created date";
            }
            if (orderBy === "priority") {
                return "Priority"
            } else {
                return "Default"
            }
        });

        return {
            util: new HandleBarsDelegator()
        };

    }(moment, jQuery, Handlebars));