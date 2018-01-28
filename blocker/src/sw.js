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

self.addEventListener("fetch", event => {
  const url = event.request.url;
  const domain = event.currentTarget.location.hostname;
  if (isBlacklistedSite(url, domain)) {
    console.log(event);
    event.respondWith(() => {
      const error = Response.error();
      error.status = -20;

      Promise.resolve(error);
    });
  }
});

// self.addEventListener("push", function(messageEvent) {
//   console.log(
//     "Handling message event:",
//     messageEvent,
//     self.registration.showNotification("KATYA ONE LOVE")
//   );
// });
