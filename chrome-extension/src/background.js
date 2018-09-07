chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('test');
  if (changeInfo.status !== 'complete') return;

  chrome.tabs.executeScript(
    tabId,
    {
      code: 'var injected = window.gitCodeShare; window.gitCodeShare = true; injected;',
      runAt: 'document_start',
    },
    res => {
      if (chrome.runtime.lastError || res[0]) return;
      chrome.tabs.executeScript(tabId, {
        file: 'index.js', // TODO: This file name will be replace with our bundle file.
        runAt: 'document_start',
      });
    },
  );
});

chrome.runtime.onMessage.addListener((req, sender, res) => {
  res({ hi: 'hi' });
});
