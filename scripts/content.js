// JavaScript variable that holds the desired font size

// Apply saved settings automatically when the page loads
chrome.storage.local.get(['jio_cinema_captions_fontSize', 'jio_cinema_captions_fontUnit'], function(result) {
  if (result.jio_cinema_captions_fontSize && result.jio_cinema_captions_fontUnit) {
      const fontSize = `${result.jio_cinema_captions_fontSize}${result.jio_cinema_captions_fontUnit}`;
      applyFontSize(fontSize) 
  }
});

// Listener for changes sent from the popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'changeFontSize') {
    applyFontSize(message.fontSize)
  }
});


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'changeFontSize') {
    applyFontSize(message.fontSize)
  }
});
// script.js
function applyFontSize(newSize) {
  console.log('New font size:', newSize);
  // Assuming you have elements you want to apply this style to, you might run:

  // Create a style element
  const style = document.createElement('style');
  document.head.appendChild(style);

  // Add CSS rules to the style element
  style.sheet.insertRule(`
  .shaka-text-region span {
      font-size: ${newSize};
  }`, 0);
}

