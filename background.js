console.log('background.js')

// Block sites for a while after clicking the block button.

var num_minutes = 180

var site_names = localStorage["site_names"];
if (typeof(site_names) === "undefined")
  site_names = ['reddit', 'news.ycombinator', 'news.google']
else
  site_names = site_names.split(",");

var click_time = null

chrome.tabs.onUpdated.addListener(function(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    console.log('tab:', tab)
    if(!click_time || Date.now() - click_time > num_minutes * 60 * 1000)
      return
    for(var i = 0; i < site_names.length; i++) {
      var name = site_names[i]
      if(tab.url.indexOf(name) != -1) {
        console.log('blocking')
        chrome.tabs.executeScript(tabId, {
          code: 'document.body.innerHTML = "blocked"'
        });
      }
    }
  })
})

chrome.browserAction.onClicked.addListener(function() {
  click_time = new Date()
})

















