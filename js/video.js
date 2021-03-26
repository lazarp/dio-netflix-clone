let video = document.getElementsByClassName("video-player")[0];
let add_audio = document.getElementsByClassName("comment-btn")[0];
let play_pause_button = document.getElementById("play-pause-button");
let play_span = document.getElementById("play-span");
let pause_span = document.getElementById("pause-span");
let progress_bar = document.getElementById("progress-bar");
let progress_bar_container = document.getElementById("progress-bar__container");
let comment_button = document.getElementById("comment-btn");
let comment_container = document.getElementById("comment-container");
let comment_textarea = document.getElementById("comment_textarea");
let comment_cancel_button = document.getElementById("comment_cancel_button");
let video_controls_container = document.getElementById("video_controls");
let comment_send_button = document.getElementById("comment_send_button");

let comment_btn_clicked = false;
var updatebar;

//---- PLAY/PAUSE ----------------------
function video_play(){
	video.play();
	play_span.style.visibility = "hidden";
	pause_span.style.visibility = "visible";
	updatebar = setInterval(update, 100);
	if(comment_btn_clicked){ //janela do comentário está aberta

	}
}
function video_pause(){
	video.pause();
	play_span.style.visibility = "visible";
	pause_span.style.visibility = "hidden";
	window.clearInterval(updatebar); //impede que o update fique sendo chamado 
}
//----- CLICK PLAY BUTTON -------------------------------
play_pause_button.addEventListener("click", function(){
	if(!video.paused && !video.ended){
		video_pause();
	}
	else{
		video_play();
	}
});

function update(){
	if(!video.ended){
		let size_percent = (video.currentTime/video.duration)*100;
		progress_bar.style.width = size_percent+'%';
	}
	else{
		play_span.style.visibility ="visible";
		pause_span.style.visibility = "hidden";
		progress_bar.style.width='0';
		progress_bar.style.transition="all 0.1s";
		window.clearInterval(updatebar); //impede que o update fique sendo chamado
	}
}
//---- PROGRESS BAR CLICK FUNCTION --------------------
/*
	1) Pegar a posição x do mouse
	2) Calcular o tempo do filme relativo à barra 
	3) Rodar o filme no tempo calculado
	4) Desenhar a progress bar até ela
*/

progress_bar_container.addEventListener("click", function(e){
	
	if(!video.ended){
		// progress_bar_container.style.backgroundColor="pink";
		let mouseX = e.pageX - progress_bar_container.getBoundingClientRect().left;
		
		let newWidth_ratio = mouseX/progress_bar_container.getBoundingClientRect().width;
		
		let newTime = newWidth_ratio * video.duration;
		video.currentTime = newTime;

		let newWidth_percent = newWidth_ratio * 100;
		progress_bar.style.width = newWidth_percent+"%";
		
	}
});

//---- ADD COMMENT ---------------------
/*
	1) Pausar Video
	2) Habilitar Textarea

*/

comment_button.addEventListener("click", function(){
	if(!comment_btn_clicked){
		open_comment_box();
	}
	else{
		close_comment_box();
	}
});

comment_cancel_button.addEventListener("click", function(){
	close_comment_box();
}, false);

function open_comment_box(){
	video_pause();
	comment_container.style.visibility = "visible";
	comment_btn_clicked = true;
}
function close_comment_box(){
	comment_container.style.visibility = "hidden";
	comment_btn_clicked = false;
}

//----- SHORTCUTS CONTROLS -------
document.addEventListener("keydown", function(e){
	if(!e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey && !comment_btn_clicked){
		switch(e.key){
			case " ": //Barra de Espaço
					if(video.paused)
						video_play();
					else
						video_pause();
					e.preventDefault(); //evita repetiçao da entrada
					break;
		}
	}
}, false);

//----- CLICK ON THE SCREEN ---------
//Deu problema. Tentar depois.
// video_controls_container.addEventListener("click",function(){
// 	if(video.paused)
// 		video.play();
// 	else
// 		video.pause();
// },false);

//---- SAVE COMMENT ------
comment_send_button.addEventListener("click", function(){
	let key = video.currentTime;
	let value = comment_textarea.value;
	localStorage.setItem(key, value);
	comment_container.style.visibility="hidden";
},false);

//----- CHANGE PLAY ICON ---------
// function changePlayIcon(){
// 	document.
// }