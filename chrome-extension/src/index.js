// This script is injected into the browser.
// interface Location {
//   readonly ancestorOrigins: DOMStringList;
// }
console.log('injected!');

function gitCodeShare() {
  const iframe = document.createElement('iframe');
  // Must be declared at web_accessible_resources in manifest.json
  iframe.id = 'gitCodeShare';
  iframe.src = chrome.runtime.getURL('src/frame.html');

  // Some styles for a fancy sidebar
  iframe.style.cssText = 'position:fixed;top:10%;right:10%;display:none;' + 'width:80%;height:70%;z-index:1000;';
  document.body.appendChild(iframe);

  // TODO: this button inject to suitable position!
  const triggerBtn = document.createElement('button');
  triggerBtn.innerHTML = 'Toggle!';
  document.getElementsByTagName('body')[0].appendChild(triggerBtn);
  triggerBtn.addEventListener('click', () => {
    iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
  });
}

const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;

if (!window.location.ancestorOrigins.contains(extensionOrigin)) {
  gitCodeShare();
}
