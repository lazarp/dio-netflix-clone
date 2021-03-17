var video = document.getElementsByClassName("video-player")[0];
var add_audio = document.getElementsByClassName("comment-btn")[0];


function getTime(){
    console.log(video.currentTime);
    return video.currentTime;
}

function renameHTML(new_text, object){
    object.innerHTML = new_text;
}