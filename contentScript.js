function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
}

const removeShortsFromSidebar = () => {
    var sidebar = document.querySelector('ytd-mini-guide-renderer');
    if (!sidebar) {
        return false
    }
    var elements = sidebar.querySelectorAll('ytd-mini-guide-entry-renderer');
    elements.forEach(function(element) {
        var h2Element = element.querySelector('a');
        if (h2Element && h2Element.title === 'Shorts') {
            element.parentNode.removeChild(element);
            return true;
        }
    });
    return false;
}

const removeShortsFromBody = () => {   
    var elements = document.querySelectorAll('ytd-rich-section-renderer');
    elements.forEach(function(element) {
        var h2Element = element.querySelector('h2');
        if (h2Element) {
            var spanElement = h2Element.querySelector('span#title.style-scope.ytd-rich-shelf-renderer');
            if (spanElement && spanElement.innerText === 'Shorts') {
                element.parentNode.removeChild(element);
            }
        }
    });
}

var debouncedRemoveShortsFromBody = debounce(removeShortsFromBody, 300);
var debouncedRemoveShortsFromSidebar = debounce(removeShortsFromSidebar, 300);

document.onscroll = () => {
    debouncedRemoveShortsFromBody();
    debouncedRemoveShortsFromSidebar();
}

removeShortsFromBody();

var retries1 = 10;
var sidebarInterval = setInterval(() => {
    retries1--;
    if (removeShortsFromSidebar() || retries1 === 0) {
        clearInterval(sidebarInterval);
    }
}, 300)

const callback = () => {
    debouncedRemoveShortsFromBody();
    debouncedRemoveShortsFromSidebar();
}

var observer = new MutationObserver(callback,);

observer.observe(document.body, {childList: true, subtree: true  })

