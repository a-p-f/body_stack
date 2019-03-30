var BodyStack = {
    push: function(new_body, document) {
        document = document || window.document;
        if (!new_body) {
            new_body = document.createElement('body');
        }
        else if (typeof new_body == 'string') {
            var content = new_body;
            new_body = document.createElement('body');
            new_body.innerHTML = content;
        }

        var stack = document._body_stack = document._body_stack || [];
        var scroll_configs = [];
        var elements = document.getElementsByTagName('*');
        for (var i = elements.length - 1; i >= 0; i--) {
            var element = elements[i];
            if (element.scrollTop || element.scrollLeft) {
                scroll_configs.push({
                    element: element,
                    scrollTop: element.scrollTop,
                    scrollLeft: element.scrollLeft,
                });
            }
        }
        stack.push({
            body: document.body,
            active_element: document.activeElement,
            scrolled_elements: scroll_configs,
        });
        document.documentElement.replaceChild(new_body, document.body);
        return new_body;
    },
    pop: function(document) {
        document = document || window.document;
        var x = document._body_stack.pop();
        document.documentElement.replaceChild(x.body, document.body);

        // restore focus BEFORE restoring scroll positions
        x.active_element && x.active_element.focus();

        for (var i = x.scrolled_elements.length - 1; i >= 0; i--) {
            var config = x.scrolled_elements[i];
            config.element.scrollTop = config.scrollTop;
            config.element.scrollLeft = config.scrollLeft;
        }

        // Just in case caller wants to do anything with this 
        return x.body;
    },
}