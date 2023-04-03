var firePageTimeout = 5 * 60 * 1000;
window.timeOnSite = 0;
window.reachedBottom = false;
window.title = document.getElementById("title").innerHTML;
window.sentInFrame = false;

window.onload = function() {
    setInterval(function() {
        window.timeOnSite = window.timeOnSite + 1;
    }, 1000);
    window.onbeforeunload = function() {
        if (window.sentInFrame == false) {
        firePageVisit();
        }
    }
    setTimeout(function() {
        if (window.sentInFrame == false) {
        firePageVisit();
        }
    }
    , firePageTimeout);
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden == true) {
        firePageVisit();
    }
});

window.onscroll = function(ev) {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        window.reachedBottom = true;
    }
};

async function firePageVisit(redir) {
    if (window.sentInFrame == false) {
    var userAgent = navigator.userAgent;
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    var browserLanguage = navigator.language || navigator.userLanguage;
    var pageUrl = window.location.href;
    var sentOnUnix = new Date().getTime();
    var timeOnSiteCopy = window.timeOnSite
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://novella-cb696-default-rtdb.europe-west1.firebasedatabase.app/main/tracking.json", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ 
        "userAgent": userAgent,
        "isMobile": isMobile,
        "browserLanguage": browserLanguage,
        "pageUrl": window.title,
        "sentOnUnix": sentOnUnix,
        "timeOnSite": timeOnSiteCopy,
        "reachedBottom": window.reachedBottom
    }));
    window.sentInFrame = true;
    }
    if (redir) {
        setTimeout(function() {
        window.sentInFrame = true;
        window.location.href='./index.html';
        }, 100);
    }
}

async function firePageVisitAndRedir(redir) {
    if (window.sentInFrame == false) {
    var userAgent = navigator.userAgent;
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    var browserLanguage = navigator.language || navigator.userLanguage;
    var pageUrl = window.location.href;
    var sentOnUnix = new Date().getTime();
    var timeOnSiteCopy = window.timeOnSite
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://novella-cb696-default-rtdb.europe-west1.firebasedatabase.app/main/tracking.json", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ 
        "userAgent": userAgent,
        "isMobile": isMobile,
        "browserLanguage": browserLanguage,
        "pageUrl": window.title,
        "sentOnUnix": sentOnUnix,
        "timeOnSite": timeOnSiteCopy,
        "reachedBottom": window.reachedBottom
    }));
    window.sentInFrame = true;
    }
    if (redir) {
        setTimeout(function() {
        window.sentInFrame = true;
        window.location.href=redir;
        }, 100);
    }
}