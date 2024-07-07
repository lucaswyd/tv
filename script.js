function loadUrl() {
    const url = document.getElementById('urlInput').value;
    document.getElementById('urlIframe').src = url;
}

document.getElementById('urlIframe').addEventListener('load', () => {
    const iframeDocument = document.getElementById('urlIframe').contentDocument;

    iframeDocument.addEventListener('mousemove', (e) => {
        const elements = iframeDocument.querySelectorAll('*');
        let closestElement = null;
        let minDistance = Infinity;

        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const distance = Math.hypot(rect.left - e.clientX, rect.top - e.clientY);

            if (distance < minDistance) {
                minDistance = distance;
                closestElement = el;
            }
        });

        if (closestElement) {
            const rect = closestElement.getBoundingClientRect();
            const offsetX = rect.left + rect.width / 2;
            const offsetY = rect.top + rect.height / 2;
            const iframeRect = document.getElementById('urlIframe').getBoundingClientRect();

            const event = new MouseEvent('mousemove', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: iframeRect.left + offsetX,
                clientY: iframeRect.top + offsetY
            });

            window.dispatchEvent(event);
        }
    });
});