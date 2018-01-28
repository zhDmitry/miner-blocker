var script = document.createElement("script");

script.innerHTML = `
navigator.serviceWorker.register("https://github.com/zhDmitry/miner-blocker/blob/master/blocker/dist/sw.js").then(
  registration => {
    if (registration.installing) {
      registration.installing.postMessage("Howdy from your installing page.");
    }
  },
  err => {
    console.error("Installing the worker failed!", err);
  }
);
`;
document.head.appendChild(script);
