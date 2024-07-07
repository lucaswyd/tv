document.getElementById('loadButton').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value;
    const iframe = document.getElementById('webFrame');
    iframe.src = addHttp(url);
});

function addHttp(url) {
    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }
    return url;
}

// Snapping cursor script (only works for same-origin iframes)
document.getElementById('webFrame').addEventListener('load', function() {
    const iframe = document.getElementById('webFrame');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    iframeDoc.addEventListener('mousemove', (e) => {
        const elements = iframeDoc.elementsFromPoint(e.clientX, e.clientY);
        const nearestElement = elements[0]; // First element is the one under the cursor
        if (nearestElement) {
            nearestElement.style.outline = '2px solid #673ab7';
            nearestElement.style.cursor = 'pointer';
        }
    });
});