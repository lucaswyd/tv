document.getElementById('loadButton').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value;
    const iframe = document.getElementById('webFrame');
    iframe.src = url;
});

// Snapping cursor script
document.addEventListener('mousemove', (e) => {
    const iframe = document.getElementById('webFrame');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    const elements = iframeDoc.elementsFromPoint(e.clientX, e.clientY);
    const nearestElement = elements[1]; // The first element is the iframe itself
    if (nearestElement) {
        nearestElement.style.outline = '2px solid #673ab7';
        nearestElement.style.cursor = 'pointer';
    }
});