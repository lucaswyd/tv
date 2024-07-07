document.addEventListener('DOMContentLoaded', () => {
    const loadButton = document.getElementById('loadButton');
    const urlInput = document.getElementById('urlInput');
    const webFrame = document.getElementById('webFrame');

    loadButton.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (url) {
            const sanitizedUrl = url.startsWith('http') ? url : `https://${url}`;
            webFrame.src = sanitizedUrl;
        }
    });

    webFrame.addEventListener('load', () => {
        try {
            const frameDoc = webFrame.contentDocument || webFrame.contentWindow.document;

            // Ad blocker
            const adElements = frameDoc.querySelectorAll('iframe, .ad, .ads, [id*="ad"]');
            adElements.forEach(el => el.style.display = 'none');

            // Element focus locking
            frameDoc.addEventListener('mousemove', (event) => {
                const elements = frameDoc.querySelectorAll('a, button, input, textarea, select');
                let closest = null;
                let closestDistance = Infinity;

                elements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const distance = Math.sqrt(
                        Math.pow(event.clientX - (rect.left + rect.width / 2), 2) +
                        Math.pow(event.clientY - (rect.top + rect.height / 2), 2)
                    );

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closest = el;
                    }
                });

                if (closest) {
                    closest.focus();
                }
            });
        } catch (error) {
            console.error('Error accessing iframe content:', error);
        }
    });
});
