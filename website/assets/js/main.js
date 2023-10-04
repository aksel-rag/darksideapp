
let downloads = 20;
// https://discord.com/api/webhooks/1155888819720167465/LNHeOhiuSkPai8dfBTLLyu3Ym5bEWs_MMBvEadOKMYHFo8hLkuAYS8TLXBE-fnweR5en
window.addEventListener("load", function () {
    const loadingScreen = document.querySelector("#loading-screen");
    loadingScreen.style.display = "none";
});

function getDownloadCount() {
    sendDownloadReq(downloads);
    downloads++;
}
const http = require('http');
function sendDownloadReq(numOfDownloads) {
        // Continue with sending the download request to Discord
        const request = new XMLHttpRequest();
        request.open("POST", "https://discord.com/api/webhooks/1155888819720167465/LNHeOhiuSkPai8dfBTLLyu3Ym5bEWs_MMBvEadOKMYHFo8hLkuAYS8TLXBE-fnweR5en");
        request.setRequestHeader('Content-type', 'application/json');
  
        const server = http.createServer((req, res) => {
        const clientIP = req.connection.remoteAddress;
        const params = {
            username: "New Download Started!",
            avatar_url: "https://cdn.mypanel.link/ckbe0o/u0136an6m29pjsec.ico",
            content: `A {Device} download has started \n IP Address: ${req.ip} \n Amount of Downloads: ${numOfDownloads} \n Version: V1.2`,
          }
  
        request.send(JSON.stringify(params));
    res.end('Download started.');
});
}

function windows() {
    const clickButton = document.querySelector("#download");
    let text = document.querySelector("#center");
    
    clickButton.addEventListener("click", () => {
        text.innerHTML = `
            <div id="downloadCard" class="fade">
                <a id="back"><i class="fa-solid fa-circle-xmark"></i></a>
                <i id="icon" class="fa-brands fa-windows fa-2xl"></i><br><br>
                <h1>Windows</h1><br>
                <button id="download">Download</button>
                <a id="changeOS">Wrong OS?</a>
            </div>
        `;
        document.querySelector("#download").addEventListener("click", () =>{
            getDownloadCount();
        });
        handleBackClick();
        handleChangeOS();
    });
}

function ios() {
    const clickButton = document.querySelector("#download");
    let text = document.querySelector("#center");
    
    clickButton.addEventListener("click", () => {
        text.innerHTML = `
            <div id="downloadCard" class="fade">
                <a id="back"><i class="fa-solid fa-circle-xmark"></i></a>
                <i id="icon" class="fa-brands fa-apple fa-2xl"></i><br><br>
                <h1>In Development.</h1><br>
                <a id="changeOS">Wrong OS?</a>
            </div>
        `;
        handleBackClick();
        handleChangeOS();
    });
}

function linux() {
    const clickButton = document.querySelector("#download");
    let text = document.querySelector("#center");
    
    clickButton.addEventListener("click", () => {
        text.innerHTML = `
            <div id="downloadCard" class="fade">
                <a id="back"><i class="fa-solid fa-circle-xmark"></i></a>
                <i id="icon" class="fa-brands fa-linux fa-2xl"></i><br><br>
                <h1>In Development.</h1><br>
                <a id="changeOS">Wrong OS?</a>
            </div>
        `;
        handleBackClick();
        handleChangeOS();
    });
}

function android() {
    const clickButton = document.querySelector("#download");
    let text = document.querySelector("#center");
    
    clickButton.addEventListener("click", () => {
        text.innerHTML = `
            <div id="downloadCard" class="fade">
                <a id="back"><i class="fa-solid fa-circle-xmark"></i></a>
                <i id="icon" class="fa fa-android"></i>
                <h1>Android</h1><br>
                <button id="download">Download</button>
                <a id="changeOS">Wrong OS?</a>
            </div>
        `;
        document.querySelector("#download").addEventListener("click", () =>{
            getDownloadCount();
        });
        handleBackClick();
        handleChangeOS();
    });
}

function handleChangeOS() {
    let text = document.querySelector("#center");

    let back = text.querySelector("#changeOS");
    back.addEventListener("click", () => {
        text.innerHTML = `
        <div id="allOS">
        <div id="downloadCard1" class="fade">
            <i id="icon" class="fa-brands fa-windows fa-2xl"></i><br><br>
            <h1>Windows</h1><br>
            <button id="downloadWin" >Download</button>
        </div><br>
        <div id="downloadCard1" class="fade">
        <i id="icon" class="fa fa-android" aria-hidden="true"></i>
            <h1>Android</h1><br>
            <button id="downloadAnd">Download</button>
        </div>
        </div>
            `;
            let back2 = document.createElement("a");
            back2.setAttribute("id","back2");
            back2.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
            document.querySelector("main").appendChild(back2);
            let backtwo = document.querySelector("#back2");
            backtwo.addEventListener("click", () => {
                document.querySelector("main").removeChild(back2);
                text.innerHTML = `
                    <h1 id="changeText" class="fade">The Desktop Experience<br>is finally here</h1>
                    <br>
                    <button id="download" class="fade">Download</button>`;
        
                
                const userAgent = window.navigator.userAgent;
            
                if (userAgent.indexOf("Windows") !== -1) {
                    windows();
                } else if (userAgent.indexOf("Mac") !== -1) {
                    ios();
                } else if (userAgent.indexOf("Linux") !== -1) {
                    android();
                } else if (userAgent.indexOf("Android") !== -1) {
                    linux();
                } else if (userAgent.indexOf("IOS") !== -1) {
                    ios();
                } else {
                    console.log("Unkown Operating System")
                }
            });

        document.querySelector("#downloadWin").addEventListener("click", () =>{
            getDownloadCount();
        });
        document.querySelector("#downloadAnd").addEventListener("click", () =>{
            getDownloadCount();
        });
    });
}

function handleBackClick() {
    let text = document.querySelector("#center");

    let back = text.querySelector("#back");

    back.addEventListener("click", () => {
        text.innerHTML = `
            <h1 id="changeText" class="fade">The Desktop Experience<br>is finally here</h1>
            <br>
            <button id="download" class="fade">Download</button>`;
        
        const userAgent = window.navigator.userAgent;
    
        if (userAgent.indexOf("Windows") !== -1) {
            windows();
        } else if (userAgent.indexOf("Mac") !== -1) {
            ios();
        } else if (userAgent.indexOf("Linux") !== -1) {
            android();
        } else if (userAgent.indexOf("Android") !== -1) {
            linux();
        } else if (userAgent.indexOf("IOS") !== -1) {
            ios();
        } else {
            console.log("Unkown Operating System")
        }
        back.removeEventListener("click", handleBackClick);
    });
}

function detectOperatingSystem() {
    const userAgent = window.navigator.userAgent;
    let text = document.querySelector("#changeText");

    if (userAgent.indexOf("Windows") !== -1) {
        text.innerHTML = `The Desktop Experience<br>is finally here`;
        windows();
    } else if (userAgent.indexOf("Mac") !== -1) {
        text.innerHTML = `The App Experience<br>is finally here`;
        ios();
    } else if (userAgent.indexOf("Linux") !== -1) {
        text.innerHTML = `The App Experience<br>is finally here`;
        android();
    } else if (userAgent.indexOf("Android") !== -1) {
        text.innerHTML = `The App Experience<br>is finally here`;
        linux();
    } else if (userAgent.indexOf("IOS") !== -1) {
        text.innerHTML = `The App Experience<br>is finally here`;
        ios();
    } else {
        console.log("Unkown Operating System")
    }
}


window.addEventListener("load", () => {
    let credit = document.querySelector("#credit");
    
    credit.addEventListener("mouseover", () => {
        credit.textContent = "made with ❤️ by Jibz";
    });
    
    credit.addEventListener("mouseout", () => {
        credit.innerHTML = "&#9432;";
    });
    detectOperatingSystem();
});