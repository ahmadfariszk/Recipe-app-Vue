let resizeTimeout: number | null = null;

// Function to enable or disable hover rules based on hover support
// TODO: An existing bug is that when resizing from mobile to desktop (in browser), the hover styling is not applied after the switch. Fix this later.
function toggleHoverStyles() {
  try {
    const hasHoverSupport = window.matchMedia('(hover: hover)').matches;

    // Iterate through all stylesheets in the document
    for (const sheet of Array.from(document.styleSheets)) {
      // Ensure the stylesheet can be accessed (some may be cross-origin)
      if (sheet.cssRules) {
        // Iterate backwards to avoid index shifting when deleting rules
        for (let i = sheet.cssRules.length - 1; i >= 0; i--) {
          const rule = sheet.cssRules[i] as CSSStyleRule;
          if (rule.selectorText && rule.selectorText.includes(':hover')) {
            if (hasHoverSupport) {
              // Restore hover styles if hover is supported
              sheet.insertRule(rule.cssText, i);
            } else {
              // Remove hover styles if hover is not supported (e.g., on mobile)
              sheet.deleteRule(i);
            }
          }
        }
      }
    }
  } catch (error) {
    console.warn("Could not toggle hover styles:", error);
  }
}

// Debounced resize event to prevent multiple triggers
function debounceResizeEvent() {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }

  resizeTimeout = window.setTimeout(() => {
    toggleHoverStyles();
  }, 200); // Adjust timeout (200ms) to your needs
}

export default defineNuxtPlugin(() => {
// Initial check to disable hover if mobile
if (typeof window !== 'undefined') {
  toggleHoverStyles();

  // Add listener to update on screen resizing, e.g: switching from desktop to mobile in browser
  window.addEventListener('resize', debounceResizeEvent);
}
});
