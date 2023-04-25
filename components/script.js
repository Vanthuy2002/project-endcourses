const app = {
  song: [
    {
      name: "Biết Ong Thương Không",
      singer: "Thủy Nguyễn",
      path: "./src/music/Biết Ong Thương Không.mp3",
      img: "./src/img/nn.jpg",
    },
    {
      name: "Đường tôi chở em về",
      singer: "Singer 2",
      path: "./src/music/Đường Tôi Chở Em Về.mp3",
      img: "./src/img/a15f06f41d79337c6ebde50c20969fee.png",
    },
    {
      name: "Lửng và Ler.mp3",
      singer: "Singer 3",
      path: "./src/music/Lửng và Ler.mp3",
      img: "./src/img/lofi-girl-making-beat.jpg",
    },
    {
      name: "Sang Xin Mịn.mp3",
      singer: "Singer 4",
      path: "./src/music/Sang Xịn Mịn.mp3",
      img: "./src/img/anh-nhac.jpg",
    },
    {
      name: "Thu Cuối.mp3",
      singer: "Singer 5",
      path: "./src/music/Thu Cuối.mp3",
      img: "./src/img/lofi-girl-making-beat.jpg",
    },
    {
      name: "Người Em Cố Đô.mp3",
      singer: "Singer 5",
      path: "./src/music/Người Em Cố Đô.mp3",
      img: "./src/img/lofi-girl-making-beat.jpg",
    },
    {
      name: "Thuyền Quyên.mp3",
      singer: "Singer 5",
      path: "./src/music/Thuyền Quyên.mp3",
      img: "./src/img/anh-nhac.jpg",
    },
  ],
};
// render ra views UI
const listSong = document.querySelector(".recently-list");
const playIng = document.querySelector(".playing");
const audio = document.getElementById("audio");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const randomBtn = document.querySelector(".random");
const repeatBtn = document.querySelector(".repeat");
let timeLine = document.querySelector("#timeline");
const playSong = document.querySelector(".play");
let currentIndex = 0;
let imgThumb = document.querySelector(".control-thumb");
let volumn = document.querySelector(".custom-volum");
let muted = document.querySelector(".mute");
let volumText = document.querySelector(".volumn-text");
let isPlaySong = false;
let isRandom = false;
let isRepeat = false;

function render(arr, parent) {
  let html = arr.map((song, index) => {
    return `<div class="recently-item" data-id=${index}>
        <img src=${song.img} alt="${song.name}" class="recently-thumb" />
        <h2 class="recently-name">${song.name}</h2>
        <p class="recently-author">${song.singer}</p>
      </div>`;
  });

  parent.innerHTML = html.join("");
}

function getCurrentSong() {
  let titleSong = document.querySelector(".control-title");
  let author = document.querySelector(".control-auth");

  imgThumb.src = app.song[currentIndex].img;
  author.textContent = app.song[currentIndex].singer;
  titleSong.textContent = app.song[currentIndex].name;
  audio.src = app.song[currentIndex].path;
}

playIng.onclick = () => {
  if (isPlaySong) {
    audio.pause();
  } else {
    audio.play();
  }
};

playSong.onclick = () => {
  audio.play();
};

document.body.addEventListener("click", (e) => {
  let songNode = e.target.closest(".recently-item");
  if (songNode) {
    currentIndex = songNode.dataset.id;
    getCurrentSong();
    audio.play();
  }
});

audio.onplay = () => {
  isPlaySong = true;
  handleClass(playIng, "remove", "fa-play");
  handleClass(imgThumb, "add", "rotate");
};

audio.onpause = () => {
  isPlaySong = false;
  handleClass(playIng, "add", "fa-play");
  handleClass(imgThumb, "remove", "rotate");
};

nextBtn.onclick = () => {
  if (isRandom) {
    randomSong();
  } else {
    loadNextSong();
    audio.play();
  }
};

prevBtn.onclick = () => {
  loadPrevSong();
  audio.play();
};

randomBtn.onclick = () => {
  isRandom = !isRandom;
  randomBtn.classList.toggle("active", isRandom);
};

timeLine.oninput = () => {
  audio.currentTime = timeLine.value;
};

audio.ontimeupdate = () => {
  timeLine.max = audio.duration;
  timeLine.value = audio.currentTime;
};

volumn.oninput = () => {
  audio.volume = (volumn.value / 100) * 1;
  volumText.textContent = volumn.value;
  if (audio.volume === 0) {
    handleClass(muted, "add", "fa-volume-xmark");
  } else {
    handleClass(muted, "remove", "fa-volume-xmark");
  }
};

repeatBtn.onclick = () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
};

audio.onended = () => {
  if (isRepeat) {
    audio.play();
  } else {
    loadNextSong();
  }
};

function loadNextSong() {
  currentIndex++;
  if (currentIndex >= app.song.length) {
    currentIndex = 0;
  }
  getCurrentSong();
}

function loadPrevSong() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = app.song.length - 1;
  }
  getCurrentSong();
}

function randomSong() {
  let randomIndex = Math.floor(Math.random() * app.song.length);
  let newIndex;
  if (newIndex !== randomIndex) {
    currentIndex = randomIndex;
    getCurrentSong();
    audio.play();
  }
  newIndex = randomIndex;
}

function handleClass(selector, type, value) {
  selector.classList[type](value);
}

function start() {
  render(app.song, listSong);
  getCurrentSong();
}

start();
