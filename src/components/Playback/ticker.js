
const workercode = () => {
    let interval;
    let time = 0;
    let nextsong = "next song";
    self.addEventListener("message", (e) => {
        // delete interval if it exists already
        if (e.data === "start" || e.data === "stop") {
            // console.log("clearing interval");
            clearInterval(interval);
            time = 0;
        }
    switch (e.data) {
        case "start":
            // console.log("starting ticker...")
            interval = setInterval(() => {
                time += 100;
                // self.postMessage("tick");
                postMessage({ time });
            }, 100);
            break;
        case "stop":
            // console.log("stopping ticker...");
            clearInterval(interval);
            time = 0;
            break;
        case "next-song":
            // console.log("Resetting time...");
            time = 0;
            break;
    };
}, false);
}

// convert the worker code to a blob object
let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
const blob = new Blob([code], { type: "application/javascript" });
const tickerjs = URL.createObjectURL(blob);

export default tickerjs;
