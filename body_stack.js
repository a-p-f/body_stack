var BodyStack = {
    push: function(document, new_body) {
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
            scrolled_elements: scroll_configs,
        });
        document.documentElement.replaceChild(new_body, document.body);
    },
    push_with_conten
    pop: function(document) {
        var x = document._body_stack.pop();
        document.documentElement.replaceChild(x.body, document.body);

        for (var i = x.scrolled_elements.length - 1; i >= 0; i--) {
            var config = x.scrolled_elements[i];
            config.element.scrollTop = config.scrollTop;
            config.element.scrollLeft = config.scrollLeft;
        }
    },
}