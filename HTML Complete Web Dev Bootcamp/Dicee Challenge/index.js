var count = 0;
count++;
var dice1 = Math.round(Math.random() * 6 + 1);
var dice2 = Math.round(Math.random() * 6 + 1);

if(count > 0) {
    if(dice1 > dice2) {
        document.querySelector(".container h1").innerHTML = "Player 1 Wins";
    }
    else if(dice1 < dice2) {
        document.querySelector(".container h1").innerHTML = "Player 2 Wins";
    }
    else {
        document.querySelector(".container h1").innerHTML = "Its a draw";
    }

}
var imageLocation1 = "images/dice" + dice1 + ".png";
var imageLocation2 = "images/dice" + dice2 + ".png";

console.log(document.querySelector("img")[0]);
document.querySelectorAll("img")[0].setAttribute("src", imageLocation1);
document.querySelectorAll("img")[1].setAttribute("src", imageLocation2);