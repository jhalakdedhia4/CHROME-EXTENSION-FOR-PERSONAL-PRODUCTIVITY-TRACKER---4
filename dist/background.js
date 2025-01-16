chrome.runtime.onInstalled.addListener(() => {
    console.log("Productivity Tracker Installed");
  });
  
  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      console.log("Active Tab URL:", tab.url);
    });
  });
  
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      return { cancel: true };
    },
    { urls: ["*://*.youtube.com/*", "*://*.facebook.com/*"] }, // Add other blocked sites here
    ["blocking"]
  );
  