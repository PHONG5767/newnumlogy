const audioFiles = [
  `./audio/${nummain}.mp3`,
  `./audio/ex${caculateSum(ExpressionNumber())}.mp3`,
  `./audio/soul${caculateSum(HeartsDesireNumber(lowercaseCharacters))}.mp3`,
];
let currentAudioIndex = 0;

const backgroundAudio = document.getElementById("backgroundAudio");
const audioPlayer = document.getElementById("audioPlayer");
const progressBar = document.getElementById("progressBar");

function updateProgressBar() {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progress}%`;
}

function loadAudioFile() {
  audioPlayer.getElementsByTagName("source")[0].src =
    audioFiles[currentAudioIndex];
  audioPlayer.load();
}

function nextAudioFile() {
  currentAudioIndex++;
  if (currentAudioIndex >= audioFiles.length) {
    currentAudioIndex = 0;
  }
  loadAudioFile();
  audioPlayer.play();
  creatInfoText(currentAudioIndex);
}

progressContainer.addEventListener("click", function (e) {
  const totalWidth = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const percent = (clickX / totalWidth) * 100;
  const seekTime = (audioPlayer.duration * percent) / 100;
  audioPlayer.currentTime = seekTime;
});

audioPlayer.addEventListener("timeupdate", updateProgressBar);
audioPlayer.addEventListener("ended", nextAudioFile);

// Tải và phát file âm thanh đầu tiên khi trang tải hoàn tất
document.addEventListener("DOMContentLoaded", function () {
  loadAudioFile();
  audioPlayer.play();
  creatInfoText(currentAudioIndex);
});

let num = [
  nummain,
  caculateSum(ExpressionNumber()),
  caculateSum(HeartsDesireNumber(lowercaseCharacters)),
];
let des = [
  "Your Life Path Number: ",
  "Your Expression Number: ",
  "Your Hearts Desire Number: ",
];

function creatInfoText(currentAudioIndex) {
  document.getElementById("numMain").innerHTML = num[currentAudioIndex];
  let fullnameUpperCase = fullname.toUpperCase();
  document.getElementById(
    "name-Dm"
  ).innerHTML = `<p><span>Your Name:</span> ${fullnameUpperCase}</p>`;
  document.getElementById(
    "birthday-Dm"
  ).innerHTML = `<p><span>Birth Day: </span>${day}/${month}/${year}</p>`;
  document.getElementById("decripttion").innerHTML = des[currentAudioIndex];
}
creatInfoText();

function showNummain() {
  document.getElementById("numMain").style.display = "block";
}
setTimeout(showNummain, 5000);

// Phát âm thanh nền liên tục
backgroundAudio.play();

function createLifePathContent() {
  document.getElementById(
    "titleLifePath"
  ).innerHTML = `<h2>1. Your Life Path Number: ${nummain}</h2>`;
  document.getElementById("decripttionLifePath").innerHTML =
    mainNumber["num" + nummain];
  document.getElementById(
    "titleExpression"
  ).innerHTML = `<h2>2. Your Expression Number: ${caculateSum(
    ExpressionNumber()
  )}</h2>`;
  document.getElementById("decripttionExpression").innerHTML =
    ExpressionnumberName["num" + caculateSum(ExpressionNumber())];
  document.getElementById(
    "titleHeartDesire"
  ).innerHTML = `<h2>3. Your Hearts Desire Number: ${caculateSum(
    HeartsDesireNumber(lowercaseCharacters)
  )}</h2>`;
  document.getElementById("decripttionHeartDesire").innerHTML =
    HeartDesireNumberContent[
      "num" + caculateSum(HeartsDesireNumber(lowercaseCharacters))
    ];
}

function createPeriodCycle() {
  document.getElementById(
    "titlePeriod"
  ).innerHTML = `<h2>4: The Period Cycle Numbers</h2>`;
  document.getElementById("numPeriod1").innerHTML = numday;
  document.getElementById("numPeriod2").innerHTML = nummonth;
  document.getElementById("numPeriod3").innerHTML = numyear;
}


function createBirthday() {
  document.getElementById('titleBirthday').innerHTML = `<h2>5: Your Birth Day Number: ${day}</h2>`;
}

function createInfoBook() {
  document.getElementById('nummainBook').innerHTML = nummain;
  document.getElementById('nameBook').innerHTML = fullname
}
function bootstrap() {
  createLifePathContent();
  createPeriodCycle();
  createBirthday();
  createInfoBook()
}
bootstrap();
