console.log('background.js');

// Set default black and whitelist values.

// chrome.storage.sync.get({
//   blacklist: [
//     'reddit', 'news.ycombinator', 'news.google',
//     'twitter.com/$', 'facebook', 'youtube', 'twitch', 'tumblr'],
//   whitelist: ['cardbrew']
// }, function(items) {});

var blacklist = [
    'reddit', 'news.ycombinator', 'news.google',
    'twitter.com/$', 'facebook', 'youtube', 'twitch', 'tumblr'];
var whitelist = ['cardbrew'];



var num_minutes = 300;
var click_time = null;

chrome.tabs.onUpdated.addListener(function(tabId) {

  // If button has been clicked and time hasn't expired, check if the tab is allowed.

  chrome.tabs.get(tabId, function(tab) {
    console.log('tab:', tab);
    if(!click_time || Date.now() - click_time > num_minutes * 60 * 1000)
      return;
    block_tab(tab);
  });
});

function block_tab(tab) {

  // Load black and whitelist.

  // var blacklist = null, whitelist = null
  // chrome.storage.sync.get(function(items) {
  //   blacklist = items.blacklist
  //   whitelist = items.whitelist

    // Block the tab if a blacklist regex matches, unless a whitelist regex matches.

    console.log('block_tab:', tab);
    for(var i = 0; i < whitelist.length; i++)
      if(tab.url.toLowerCase().indexOf(whitelist[i].toLowerCase()) != -1)
        return;
    blacklist.forEach(function(name) {
      var regex = 'https?:\/\/(www\.)?' + name;
      console.log('tab.url:', tab.url, 'regex:', regex);
      if(tab.url.match(regex)) {
        console.log('match, blocking');
        chrome.tabs.executeScript(tab.id, {
          code: 'document.body.innerHTML = "blocked"'
        });
      }
    });
  // })
}

chrome.browserAction.onClicked.addListener(function() {
  click_time = new Date();
});
