
// Saves options to chrome.storage.sync.

var list_names = ['blacklist', 'whitelist']
function save_options() {
  var sync_obj = {}
  for(var i_name = 0; i_name < list_names.length; i_name++) {
    var id = list_names[i_name]
    strs = document.getElementById(id).value.split(',')
    for(var i = 0; i < strs.length; i++)
      strs[i] = strs[i].trim()
    sync_obj[id] = strs
  }

  chrome.storage.sync.set(sync_obj, function() {

    // Update status to let user know options were saved.

    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Load options on page load.

function restore_options() {
  chrome.storage.sync.get(function(items) {
    for(var i = 0; i < list_names.length; i++)
      document.getElementById(list_names[i]).value = items[list_names[i]].join(', ');
  });
}
document.addEventListener('DOMContentLoaded', restore_options);

// Debounced save on keydown.

var save_timer = null
var ignored_first = false
document.querySelector('input').onkeydown = function() {
  if(!ignored_first) {
    ignored_first = true
    return
  }
  clearTimeout(save_timer)
  save_timer = setTimeout(save_options, 500)
}
