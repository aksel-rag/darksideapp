function download() {
    const userAgent = window.navigator.userAgent;
    let device;
  
    if (userAgent.indexOf("Windows") !== -1) {
      device = "Windows";
    } else if (userAgent.indexOf("Mac") !== -1) {
      device = "Mac";
    } else if (userAgent.indexOf("Linux") !== -1) {
      device = "Linux";
    } else if (userAgent.indexOf("Android") !== -1) {
      device = "Android";
    } else if (userAgent.indexOf("IOS") !== -1) {
      device = "IOS";
    } else {
      device = "Unknown";
    }
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        const userIpAddress = data.ip;
  
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/getDownloads");
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const currentDownloads = JSON.parse(xhr.responseText).downloads;
  
            const incrementRequest = new XMLHttpRequest();
            incrementRequest.open("POST", "/increment");
            incrementRequest.setRequestHeader('Content-type', 'application/json');
            incrementRequest.onreadystatechange = function () {
              if (incrementRequest.readyState === 4 && incrementRequest.status === 200) {
                const request = new XMLHttpRequest();
                request.open("POST", "YOUR_WEBHOOOK");
                request.setRequestHeader('Content-type', 'application/json');
  
                const params = {
                    embeds: [
                      {
                        title: `New Download Started.`,
                        description: `A ${device} download has started.`,
                        fields: [
                          {
                            name: "IP Address",
                            value: userIpAddress,
                          },
                          {
                            name: "Amount of Downloads",
                            value: `${currentDownloads + 1}`,
                          },
                          {
                            name: "Version",
                            value: "V1.2",
                          },
                          {
                            name: "User Agent",
                            value: userAgent,
                          },
                        ],
                        thumbnail: {
                          url: "https://i.imgur.com/PtL69Xb.png",
                        },
                      },
                    ],
                    author: {
                      name: "Darkside API", 
                      icon_url: "https://i.imgur.com/PtL69Xb.png",
                    },
                  };
  
                request.send(JSON.stringify(params));
              }
            };
  
            incrementRequest.send();
          }
        };
        xhr.send();
      })
      .catch((error) => {
        console.error("Error fetching IP address:", error);
      });
  }


  window.addEventListener("load", function () {
    const loadingScreen = document.querySelector("#loading-screen");
    loadingScreen.style.display = "none";
  
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/getDownloads");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const currentDownloads = JSON.parse(xhr.responseText).downloads;
        const totalDownloadsElement = document.querySelector("#totalDownloads");
        totalDownloadsElement.textContent = `Total Downloads: ${currentDownloads}`;
      }
    };
    xhr.send();
  });

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
            download();
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
            download();
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
            download();
        });
        document.querySelector("#downloadAnd").addEventListener("click", () =>{
            download();
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
            <button id="download" class="fade">Download</button>
            `;

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