let video = document.getElementsByClassName("video-player")[0];
let add_audio = document.getElementsByClassName("comment-btn")[0];


function getTime(){
    console.log(video.currentTime);
    return video.currentTime;
}

function renameHTML(new_text, object){
    // object.innerHTML = new_text;
    video.pause();
}

//---- PLAY/PAUSE ----------------------
document.getElementById("play-button").addEventListener("click", function(){
	if(video.paused)
		video.play();
	else
		video.pause();
});
