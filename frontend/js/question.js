var sliders = document.getElementsByClassName("slider-bar");
var values = document.getElementsByClassName("value");

for (var i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("input", function() {
        for (var j = 0; j < sliders.length; j++) {
            values[j].innerHTML = sliders[j].value;
        }
    });
}

var next = document.getElementById("next");
var ans = '';
next.onclick = function() {
    for (var i = 0; i < sliders.length; i++) {
        if (sliders[i].value >= 5 && i == 0) {
            ans += 138 + ',';
        } else if (sliders[i].value >= 5 && i == 1) {
            ans += 112 + ',';
        } else if (sliders[i].value >= 5 && i == 2) {
            ans += 105 + ',';
        } else if (sliders[i].value >= 5 && i == 3) {
            ans += 287 + ',';
        } else if (sliders[i].value >= 5 && i == 4) {
            ans += 76 + ',';
        }
    }
    sessionStorage.setItem("ans", ans);
}