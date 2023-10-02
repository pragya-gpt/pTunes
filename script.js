let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let gif = document.getElementById("gif");
let masterSong = document.getElementById("masterSong");

let songs =[
    {songName: "Sun In The Sky", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpeg"},
    {songName: "Life Is Beautiful", filePath: "songs/2.mp3", coverPath: "covers/cover2.jpg"},    
    {songName: "Charmed By You", filePath: "songs/3.mp3", coverPath: "covers/cover3.jpg"},    
    {songName: "Evening Wine", filePath: "songs/4.mp3", coverPath: "covers/cover4.jpg"},    
    {songName: "Morning Coffee", filePath: "songs/5.mp3", coverPath: "covers/cover5.jpg"},    
    {songName: "Dream With Tea", filePath: "songs/6.mp3", coverPath: "covers/cover6.jpg"},    
    {songName: "In Heaven", filePath: "songs/7.mp3", coverPath: "covers/cover7.jpg"},    
    {songName: "Every Day", filePath: "songs/8.mp3", coverPath: "covers/cover8.jpg"},    
    {songName: "Summer Holiday", filePath: "songs/9.mp3", coverPath: "covers/cover9.jpg"},    
    {songName: "I Am Here", filePath: "songs/10.mp3", coverPath: "covers/cover10.jpg"}
]

masterPlay.addEventListener("click", ()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
       audioElement.play();
       masterPlay.classList.remove("play");
       masterPlay.classList.add("pause");
       gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove("pause");
        masterPlay.classList.add("play");
        gif.style.opacity = 0;
    }
})  

audioElement.addEventListener("timeupdate", ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    progressBar.value = progress;
}) 

progressBar.addEventListener("change", ()=>{
    audioElement.currentTime = ((progressBar.value*audioElement.duration)/100);
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("coverPlay")).forEach((element)=>{
        element.classList.remove("pause");
        element.classList.add("play");
    })
}

Array.from(document.getElementsByClassName("coverPlay")).forEach((element)=>{
    element.addEventListener("click", (e)=>{
        if(audioElement.paused)
        {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            masterSong.innerText = songs[songIndex-1].songName;
            e.target.classList.remove("play");
            e.target.classList.add("pause");
            audioElement.src =`songs/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove("play");
            masterPlay.classList.add("pause");
        }
        else
        {
            songIndex = parseInt(e.target.id);
            masterSong.innerText = songs[songIndex-1].songName;
            e.target.classList.remove("pause");
            e.target.classList.add("play");
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove("pause");
            masterPlay.classList.add("play");
        }

    })
})

document.getElementById("next").addEventListener("click", ()=>{
        if(songIndex>=10)
        {
            songIndex=1;
        }
        else
        {
            songIndex += 1;
        }
        audioElement.src =`songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        masterSong.innerText = songs[songIndex-1].songName;
        audioElement.play();
        masterPlay.classList.remove("play");
        masterPlay.classList.add("pause");
})

document.getElementById("previous").addEventListener("click", ()=>{
    if(songIndex<=1)
    {
        songIndex = 10;
    }
    else
    {
        songIndex -= 1;
    }
    audioElement.src =`songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    masterSong.innerText = songs[songIndex-1].songName;
    audioElement.play();
    masterPlay.classList.remove("play");
    masterPlay.classList.add("pause");
})


