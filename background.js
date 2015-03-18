console.log('background.js')

// Block sites for a while after clicking the block button.

var num_minutes = 300

var blacklist = [
  'reddit', 'news.ycombinator', 'news.google', 'twitter.com/$', 'facebook', 'youtube', 'twitch']
var whitelist = ['cardbrew']
var click_time = null

chrome.tabs.onUpdated.addListener(function(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    console.log('tab:', tab)
    if(!click_time || Date.now() - click_time > num_minutes * 60 * 1000)
      return
    for(var i = 0; i < whitelist.length; i++)
      if(tab.url.toLowerCase().indexOf(whitelist[i].toLowerCase()) != -1)
        return
    for(var i = 0; i < blacklist.length; i++) {
      var name = blacklist[i]
      var regex = 'https?:\/\/(www\.)?' + name
      if(tab.url.match(regex)) {
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
