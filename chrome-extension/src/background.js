chrome.browserAction.onClicked.addListener(popup => {
  const doToggle = 0;
  if (doToggle === 0) {
    chrome.tabs.create({ url: 'http://localhost:3000/api/auth/github' });
    a = 1;
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
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
        file: 'src/index.js', // TODO: This file name will be replace with our bundle file.
        runAt: 'document_start',
      });
    },
  );
});
