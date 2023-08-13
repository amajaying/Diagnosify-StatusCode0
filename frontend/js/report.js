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
request.open("POST", "http://localhost:3000/predict", true);
request.setRequestHeader("Content-Type", "application/json");
request.send(JSON.stringify(ans));




// changing content in the ui
var r = "Seasonal allergies (hay fever)";
var result = document.getElementById("result");
var result1 = document.getElementById("result1");
result1.innerHTML = '<b>' + r + '</b>' + ' ';
result.innerHTML = r;

var descrip = "Seasonal allergies, also known as hay fever, are allergic reactions that happen during certain times of the year, usually when outdoor molds release their spores, and trees, grasses, and weeds release tiny pollen particles into the air to fertilize other plants.The immune systems of people who are allergic to mold spores or pollen treat these particles(called allergens) as invaders and release chemicals, including histamine, into the bloodstream to defend against them.It 's the release of these chemicals that causes allergy symptoms."

var desc = document.getElementById("desc");
desc.innerHTML = descrip;


var pre = "Avoid allergens when possible, use air purifiers, take prescribed antihistamines.";

var precau = document.getElementById("precautions");

pre.split(",").forEach((item) => {
    precau.innerHTML += "<li>" + item + "." + "</li>";
});


// searching on map
var map = document.getElementById("map");
map.innerHTML = '<iframe src="https://www.google.com/maps/search/' + r + ' ' + 'hospital+near+me"></iframe>';