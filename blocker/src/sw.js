import preval from "babel-plugin-preval/macro";
const ABPFilterParser = require("abp-filter-parser");

const file = preval`
const fs = require("fs");
const file = fs.readFileSync("./src/list.txt", "utf8");
module.exports = file
`;

const parsedFilterData = {};
ABPFilterParser.parse(file, parsedFilterData);

function isBlacklistedSite(path, origin) {
  return ABPFilterParser.matches(parsedFilterData, path, {
    domain: origin,
    elementTypeMaskMap: ABPFilterParser.elementTypes.SCRIPT
  });
}

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const url = details.url;
    if (isBlacklistedSite(url)) {
      return { cancel: true };
    }
    return { cancel: false };
  },
  { urls: ["*://*/*"] },
  ["blocking"]
);
