const video = document.querySelector('.video-mp3');
const prev = document.querySelector('.video__prev');
const play = document.querySelector('.video__play');
const next = document.querySelector('.video__next');
const videoStart = document.querySelector('#start');
const videoEnd = document.querySelector('#end');
const duration = document.querySelector('.video-duration');
const line = document.querySelector('.video-line');
const volumeIcon = document.querySelector('.video__volume-icon');
const volumeRange = document.querySelector('.video__volume-range');

play.addEventListener('click', function () {playPause()})

function playPause() {
    play.classList.toggle('active')
    if (video.paused) {
        video.play()
        setInterval(() => {
            videoStart.innerHTML = formatTime(video.currentTime)
        }, 1000);
        videoEnd.innerHTML = formatTime(video.duration)  
    }else{
        video.pause()
    }
}

function formatTime(time) {
    const noll = (num)=> num < 10 ? '0'+num : num
    let min = Math.trunc(time / 60)
    time = time - (min*60)
    time = Math.trunc(time)
    return `${noll(min)}:${noll(time)}`
}

duration.addEventListener('click', function (e) {
    let videoTime = (e.offsetX / duration.clientWidth) * video.duration
    video.currentTime = videoTime
})

video.addEventListener('timeupdate', function () {
    let lineWidth = (video.currentTime / video.duration)
    line.style.width = lineWidth * 100 + '%'
})

class String {
    constructor(obj) {
      this.title = document.querySelector(obj.title);
      this.text = this.title.innerHTML;
      this.title.innerHTML = "";
      this.i = 0;
      this.r();
    }
    r() {
      this.title.innerHTML += this.text.charAt(this.i);
      this.i++;
      setTimeout(() => {
        this.r();
      }, 200);
    }
  }






const volumeClass = ['mute','down','normal','up']

video.onvolumechange = ()=>{
    for (let i = 0; i < volumeClass.length; i++) {
        volumeIcon.classList.remove(volumeClass[i])
    }
    let volume = video.volume * 100
    if (volume.muted) {
        volumeIcon.classList.add('mute')
    }else if (volume > 65) {
        volumeIcon.classList.add('up')
    }else if (volume > 30) {
        volumeIcon.classList.add('normal')
    }else if (volume > 0) {
        volumeIcon.classList.add('down')
    }else if (volume == 0) {
        volumeIcon.classList.add('mute')
    }
}

volumeRange.addEventListener('click', function (e) {
    video.volume = e.target.value / 100
})
