// Ad blocker script
const adBlocker = () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const ads = mutation.target.querySelectorAll('iframe, .ad, [id^="ad"], [class^="ad"], [role="advertisement"], [aria-label="advertisement"]');
            ads.forEach(ad => ad.remove());
        });
    });

    observer.observe(document, { childList: true, subtree: true });
};

adBlocker();
