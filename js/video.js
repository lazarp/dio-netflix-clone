let video = document.getElementsByClassName("video-player")[0];
let add_audio = document.getElementsByClassName("comment-btn")[0];
let play_button = document.getElementById("play-button");
let progress_bar = document.getElementById("progress-bar");


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
	if(!video.paused && !video.ended){
		video.pause();
		play_button.style.background="red";
		play_button.style.transition="all 0.3s";
		window.clearInterval(updatebar);
	}
	else{
		video.play();
		play_button.style.background="blue";
		play_button.style.transition="all 0.3s";
		var updatebar = setInterval(update, 100);
	}
});

function update(){
	if(!video.ended){
		let size_percent = (video.currentTime/video.duration)*100;
		progress_bar.style.width = size_percent+'%';
	}
	else{
		play_button.style.background="red";
		progress_bar.style.width='0';
		progress_bar.style.transition="all 0.1s";
		window.clearInterval(updatebar);
	}
}
//---- PROGRESS BAR --------------------