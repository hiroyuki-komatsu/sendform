import { template } from "./data.js";

async function openForm(tab) {
  const message = {
    "command": "copy",
    "url": tab.url,
    "title": tab.title,
  };
  const title = tab.title;
  if (title === "") {
    return;
  }

  const form = template.replace("__title__", tab.title).replace("__url__", tab.url);

  chrome.tabs.create({ url: form });
}

chrome.action.onClicked.addListener(openForm);

// Context menu
const openFormId = "open_form";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": openFormId,
    "title": "Open form",
    "contexts": ["page"],  // Right click on the page
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === openFormId) {
    openForm(tab);
  }
});
