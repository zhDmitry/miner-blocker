var script = document.createElement("script");

script.innerHTML = `
navigator.serviceWorker.register("https://4707bfea.ngrok.io/sw.js").then(
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
