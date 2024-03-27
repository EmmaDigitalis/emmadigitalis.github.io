//Mouse positioning
let mouseX = 0;
let mouseY = 0;

/*
UPDATE AFTER STATE MACHINE RESEARCH
States:
0: Nothing active
1: Currently activating content
2: Content is active
*/
const STATES = { 
    inactive: 0,
    activating: 1,
    active: 2
}

let state = STATES.active;
let section = "none";
let pattern = "none";
let page = "none";

const sectionInfo = {
    "about": { 
        dimmedCol: "#adddd3",
        fullCol: "#58c1a2",
        filter: "invert(12%) sepia(100%) hue-rotate(112deg) saturate(1)"
    },
    "design": { 
        dimmedCol: "#98a5d4",
        fullCol: "#6b82c0",
        filter: "invert(12%) sepia(100%) hue-rotate(-166deg) saturate(1)"
    },
    "development": { 
        dimmedCol: "#E6A265",
        fullCol: "#854e1e",
        filter: "invert(12%) sepia(100%) hue-rotate(-12deg) saturate(1)"
    },
    "art": { 
        dimmedCol: "#b889bd",
        fullCol: "#a25aa4",
        filter: "invert(12%) sepia(100%) hue-rotate(-112deg) saturate(1)"
    }
}

let pageSwitch = (section) => {
    $("#htmlContainer").load(`../includes/${section}.html`, function(response, status, xhr) {
        // open if successfully loads page content
        if (status == "success") {
            let transitionColor = document.querySelector("#transitionColor")
            let interval = setInterval(function() {
                if(transitionColor.getAnimations().length < 1){
                    document.querySelector("body").classList.remove("loading");
                    document.querySelector("body").classList.add("active");   
                    clearInterval(interval);
                } 
            }, 100);

            // change bg
            document.querySelector("#bgPattern").className = "";
            document.querySelector("#bgPattern").classList.add(section);  
            document.querySelector("#popout>section>#contentBg").style = `background-color: ${sectionInfo[section].fullCol}`;

            document.querySelectorAll("#about>section>article>ul>li").forEach((elem) => elem.addEventListener("mouseover", function() {
                setAboutOverlay(this);
            }));

            document.querySelectorAll("#about>section>article>ul>li").forEach((elem) => elem.addEventListener("mouseout", function() {
                hideAboutOverlay(this);
            }));
        }

        // kick an error if not
        if (status == "error") {
            let msg = "An error has occurred: ";
            $("error").html(msg + xhr.status + " " + xhr.statusText);
            alert(`${msg}${xhr.status} ${xhr.statusText}\r\nPlease send an email to Emmadigitalis@gmail.com`)
        }
    });
}


//Change Page Contents
function setSection(section, button) {
    if (page != section) {
        //Delete active buttons and set new active button
        let act = document.querySelectorAll(".activeSection");
        if (act.length > 0){
            act.forEach((elem) => elem.classList.remove("activeSection"));
        }
        button.classList.add("activeSection");

        //---------Content Actions----------------------------------------
        document.querySelector("body").classList.remove("active");
        document.querySelector("body").classList.add("loading");
        
        //Set bg colors & logo filter
        document.querySelector("#background>#transitionColor").style = `background-color: ${sectionInfo[section].fullCol};`;
        document.querySelector("#background>#bgColor").style = `background-color: ${sectionInfo[section].dimmedCol};`;
        // // !!!!!!!!!!!!!! document.querySelector("#logo").style = `filter: ${sectionInfo[section].filter};`;

        //Load necessary content when animation ends
        let popout = document.querySelector("#popout>section");
        let interval = setInterval(function() {
            if(popout.getAnimations().length < 1){
                pageSwitch(section);
                clearInterval(interval);
            } 
        }, 200);
    }
}

document.querySelectorAll("#popout>section").forEach((elem) => elem.addEventListener("animationend", function() {
    alert("done");
}));


//Change Works Content
document.addEventListener("click", function(e){
    const workElement = e.target.closest(".workElement");
    const galleryButton = e.target.closest(".galleryButton");

    // if clicking a new work
    if (workElement){
        let page = workElement.dataset.page;

        if (page){
            fetch('../data/design.json')
            .then(response => response.json())
            .then(json => {
                Object.entries(json).forEach((entry) => {
                    const [key, value] = entry;
                    // console.log(value.title);
                    if (key == page){
                        const display = document.querySelector("#web>section>article");
                        let gal = "";
                        for (img in value.imgs){
                            if (img != 0){
                                gal += `<div class='galleryButton' style='background-image: url(../img/web/${key}/thumbs/${value.imgs[img]})' data-file='${value.imgs[img]}'></div>`;    
                            }else{
                                gal += `<div class='galleryButton activeButton' style='background-image: url(../img/web/${key}/thumbs/${value.imgs[img]})' data-file='${value.imgs[img]}'></div>`;
                            }
                            
                        }

                        let rolelist = "";
                        for (role in value.roles){
                            rolelist += `<li>${value.roles[role]}</li>`;
                        }

                        display.innerHTML = `
                        <h3>${value.title}</h3>
                        <div class="info">
                            <div class='gallery'>
                                <img id='focusImage' src='../img/web/${key}/1.jpg' alt='Image gallery display' data-dir='${key}'>
                                <div class='mobileHide' id='webGallery'>
                                    ${gal}
                                </div>
                            </div>
                            
                            <h3>Roles:</h3>
                            <ul>${rolelist}</ul>

                            <a href="${value.href}">View</a>
                        </div>
                        `;
                    }
                });
            })
            .catch(error => {
                alert(`Failed to fetch data: ${error}`);
            }); 
        }
    }

    // if clicking a gallery button
    if (galleryButton){
        let file = galleryButton.dataset.file;
        let dir = document.querySelector("#focusImage").dataset.dir;

        let imagePanel = document.getElementById("focusImage");
        let act = document.querySelectorAll(".activeButton");
        if (act.length > 0){
            act.forEach((elem) => elem.classList.remove("activeButton"));
        }

        imagePanel.src = `../img/web/${dir}/${file}`;
        galleryButton.classList.add("activeButton");
    }
})

$(window).on('load', function() {
    $("#load").hide();
});

function setAboutOverlay(subject){
    const ov = document.querySelector("#about #overlay");
    ov.style.top = `${subject.offsetTop + subject.offsetHeight}px`;
    ov.style.left = `${subject.offsetLeft - ((ov.offsetWidth - subject.offsetWidth) / 2)}px`
    ov.style.opacity = 1;
    ov.innerText = subject.dataset.skill;
}

function hideAboutOverlay(){
    const ov = document.querySelector("#about #overlay");
    ov.style.opacity = 0;
}


//Call Functions
document.querySelectorAll("nav>ul>li").forEach((elem) => elem.addEventListener("click", function() {
    setSection(this.dataset.section, this);
}));



// run from inline
// function bgAdjust(col, sec) {
//     let tObject = document.getElementById("transitionColor");
//     let loadState = document.getElementsByClassName(".loading");
 
//     let interval = setInterval(function() {    
//         if (loadState.length < 1) {
//             tObject.style = "background-color: " + col + "; top: 85vh;";
//             clearInterval(interval);
//         }
//     }, 100);
// }

// function bgReset() {
//     let tObject = document.getElementById("transitionColor");
//     let loadState = document.getElementsByClassName(".loading");
 
//     let interval = setInterval(function() {    
//         if (loadState.length < 1 && tObject.getAnimations().length < 1) {
//             tObject.style = "top: 100vh;";
//             clearInterval(interval);
//         }
//     }, 100);
// }



//FPS Counter
const times = [];
let fps;

function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;

        refreshLoop();
    });
}

function frameDisplay() {
    let fpsDisplay = document.getElementById("fpsCounter");
    fpsDisplay.innerHTML = "FPS: " + String(fps);
    setTimeout(function() {
        frameDisplay();
    }, 100);

}

refreshLoop();
setTimeout(function() {
    frameDisplay();
}, 500);
