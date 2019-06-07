var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
var staticgrp = [20474470, 20474652, 20542583, 23765972, 24368520, 24368612, 21819678, 22962059];
var maxlvl = 70;




$(document).ready(function() {
    $("#tjobs").click(function() {
        //Use switch class instead?
        $(".bottom-fullwidth").toggle();

    });
    $("#tstatic").click(function() {
        $(".static").toggle();
    });
    $("#trest").click(function() {
        $(".nonstatic").toggle();
    });
    $("#tnames").click(function() {
        $(".top-left").toggle();
    });
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getFc() {
    fetch("https://xivapi.com/freecompany/9229283011365753108?data=FCM&extended=1")
        .then(response => {
            return response.json()
        })
        .then(data => {
            document.getElementById("head").innerHTML += "<h1>" + data["FreeCompany"].Name + "</h1>";
            var memArray = data["FreeCompanyMembers"];
            getChars(memArray);
        })
        .catch(err => {
            document.getElementById("menu").innerHTML = "SOMETHING WENT WRONG. YELL AT ISU <3!<br>";
            document.getElementById("menu").innerHTML += err;
        })

}

async function getChars(a) {

    var index, len;
    for (index = 0, len = a.length; index < len; ++index) {
        var starttime = Date.now()
        fetch('https://xivapi.com/character/' + a[index].ID)
            .then(response => {
                return response.json()
            })
            .then(data => {
                document.getElementById("loading").innerHTML = ("Loading... " + index + "/" + len);
                var divmain = document.createElement("div");
                var divtl = document.createElement("div");
                var divtr = document.createElement("div");
                var divbm = document.createElement("div")
                var classes = "chardiv";
                if (staticgrp.includes(data["Character"].ID)) {
                    classes += " static"
                    divtr.innerHTML = "Static";
                }
                else {
                    classes += " nonstatic"

                }
                divmain.setAttribute("class", classes);
                divmain.setAttribute("id", data["Character"].ID);

                divtl.setAttribute("class", "top-left");
                divtl.innerHTML = data["Character"].Name;

                divtr.setAttribute("class", "top-right");
            
                divbm.setAttribute("class", "bottom-fullwidth")


                var pic = document.createElement("img");
                pic.src = data["Character"].Portrait;

                if (isMobile) {
                    pic.setAttribute("width", screen.width);
                    divmain.setAttribute("width", screen.width);
                } else {
                    pic.setAttribute("width", "321");
                    divmain.setAttribute("width", "321");
                }
                pic.setAttribute("title", data["Character"].Name);
                pic.setAttribute("alt", data["Character"].Name);
                pic.setAttribute("class", "charimg");
                divmain.appendChild(pic)
                divmain.appendChild(divtl)
                divmain.appendChild(divtr)

                //divele.appendChild(data["Character"].ID);
                var jobsobject = data["Character"]["ClassJobs"];
                var jobsarray = Object.values(jobsobject);
                var arrayLength = jobsarray.length;
                for (var i = 0; i < arrayLength; i++) {
                    if (jobsarray[i].Level >= maxlvl){
                                           var classurl = "img/xivjob/" + jobsarray[i].ClassID + ".png";
                    var classpic = document.createElement("img");
                    classpic.setAttribute("width", "10%");
                    classpic.src = classurl;
                    divbm.appendChild(classpic); 
                    }
                    

                    //Do something
                }
                divmain.appendChild(divbm)
                document.getElementById("main").appendChild(divmain);
                //console.log(data)

            })
            .catch(err => {
                document.getElementById("menu").innerHTML = "SOMETHING WENT WRONG. YELL AT ISU <3!<br>";
                document.getElementById("menu").innerHTML += err;
            })
        var endtime = Date.now()
        await sleep(100 - (endtime - starttime));
    }
    document.getElementById("menu").style.display = "block";
    document.getElementById("loading").style.display = "none";
}