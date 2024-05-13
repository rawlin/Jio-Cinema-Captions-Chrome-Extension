document.addEventListener('DOMContentLoaded', function() {
    const sizeInput = document.getElementById('sizeInput');
    const unitSelector = document.getElementById('unitSelector');
    const applyButton = document.getElementById('applyButton');

    // Retrieve saved font size settings when the popup loads
    chrome.storage.local.get(['jio_cinema_captions_fontSize', 'jio_cinema_captions_fontUnit'], function(result) {
        if (result.jio_cinema_captions_fontSize && result.jio_cinema_captions_fontUnit) {
            sizeInput.value = result.jio_cinema_captions_fontSize;
            unitSelector.value = result.jio_cinema_captions_fontUnit;
        }
    });

    applyButton.addEventListener('click', function() {
        const fontSize = sizeInput.value;
        const fontUnit = unitSelector.value;
        const fullFontSize = `${fontSize}${fontUnit}`;
        chrome.storage.local.set({
            jio_cinema_captions_fontSize: fontSize,
            jio_cinema_captions_fontUnit: fontUnit
        }, function() {
            console.log('Settings saved');
        });
        // Send a message to the content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type: 'changeFontSize', fontSize: fullFontSize});
        });
    });
});
