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

const removeShortsFromExpandedSidebar = () => {
    console.log("Here????")
    var sidebar = document.getElementById('guide-inner-content');
    if(!sidebar){
        return false;
    }

    var entryRenderers = document.querySelectorAll('ytd-guide-entry-renderer');

    entryRenderers.forEach((element) => {
        anchorTag = element.querySelector('a');
        if(anchorTag && anchorTag.title=='Shorts'){
            element.parentElement.removeChild(element);
            return true
        }
    }) 
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

var debouncedRemoveShortsFromBody = debounce(removeShortsFromBody, 100);
var debouncedRemoveShortsFromSidebar = debounce(removeShortsFromSidebar, 100);
var debouncedRemoveShortsFromExpandedSidebar = debounce(removeShortsFromExpandedSidebar, 100);

document.onscroll = () => {
    debouncedRemoveShortsFromBody();
    debouncedRemoveShortsFromSidebar();
}

removeShortsFromBody();
removeShortsFromSidebar();
removeShortsFromExpandedSidebar();

var retries1 = 10;
var sidebarInterval = setInterval(() => {
    retries1--;
    if (removeShortsFromSidebar() || retries1 === 0) {
        clearInterval(sidebarInterval);
    }
}, 300)

var retries2 = 10;
var expandedSidebarInterval = setInterval(() => {
    retries2--;
    if (removeShortsFromSidebar() || retries2 === 0) {
        clearInterval(expandedSidebarInterval);
    }
}, 300)

const callback = () => {
    debouncedRemoveShortsFromBody();
    debouncedRemoveShortsFromSidebar();
    debouncedRemoveShortsFromExpandedSidebar();
}

var observer = new MutationObserver(callback,);

observer.observe(document.body, {childList: true, subtree: true  })

