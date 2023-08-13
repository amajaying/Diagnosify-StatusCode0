var view = document.getElementById("view");
var more = document.getElementById("more");
var bmiVal = sessionStorage.getItem("bmi");

var bmi = document.getElementById("bmi");
bmi.innerHTML = bmiVal;
view.onclick = showMore;


function showMore() {
    if (view.innerHTML == "Find More Details") {
        view.style.display = "block";
        view.innerHTML = "Show Less";
        more.classList.remove("hide");
    } else {
        view.innerHTML = "Find More Details";
        more.classList.add("hide");
    }
}

var ans = sessionStorage.getItem("ans");
console.log(ans);


// Post Request to the server
var request = new XMLHttpRequest();
request.open("POST", "http://localhost:3000/insert", true);
request.setRequestHeader("Content-Type", "application/json");
request.send(JSON.stringify(ans));




// changing content in the ui
var r = "Migraneyyy";
var result = document.getElementById("result");
result.innerHTML = r;

var pre = "Wash your hands regularly for 20 seconds with soap and water or alcohol-based hand rub,cover your nose and mouth with a disposable tissue or flexed elbow when you cough or sneeze,avoid close contact (1 meter or 3 feet) with people who are unwell,stay home and self-isolate from others in the household if you feel unwell,don't touch your eyes nose or mouth if your hands are not clean";

var precau = document.getElementById("precautions");

pre.split(",").forEach((item) => {
    precau.innerHTML += "<li>" + item + "." + "</li>";
});


// searching on map
var map = document.getElementById("map");
map.innerHTML = '<iframe src="https://www.google.com/maps/search/' + r + ' ' + 'hospital+near+me"></iframe>';