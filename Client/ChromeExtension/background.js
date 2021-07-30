// let close = document.getElementById("close");

// close.addEventListener("click", () => 
//     window.close()
//     , false);


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'loading' && tab.active) {
        
        
        // search for name
        
        // set supply

        // search news
    }
    console.log(changeInfo);

    if (changeInfo.url) {
        // reload
    }

    // if tab changes reload

    // if new page load
})