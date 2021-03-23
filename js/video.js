let video = document.getElementsByClassName("video-player")[0];
let add_audio = document.getElementsByClassName("comment-btn")[0];
let play_button = document.getElementById("play-button");
let progress_bar = document.getElementById("progress-bar");
let progress_bar_container = document.getElementById("progress-bar__container");
let comment_button = document.getElementById("comment-btn");
let comment_container = document.getElementById("comment-container");
let comment_textarea = document.getElementById("comment_textarea");
let comment_cancel_button = document.getElementById("comment_cancel_button");
let video_controls_container = document.getElementById("video_controls");
//---- PLAY/PAUSE ----------------------
document.getElementById("play-button").addEventListener("click", function(){
	if(!video.paused && !video.ended){
		video.pause();
		play_button.style.background="red";
		play_button.style.transition="all 0.3s";
		window.clearInterval(updatebar); //impede que o update fique sendo chamado 
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
		progress_bar_container.style.backgroundColor="pink";
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
	3) Salvar Comentário (?)

*/
let comment_btn_clicked = false;
comment_button.addEventListener("click", function(){
	if(!comment_btn_clicked){
		video.pause();
		comment_container.style.visibility = "visible";
		comment_container.focus();
		comment_btn_clicked = true;
	}
	else{
		// video.play();
		comment_container.style.visibility = "hidden";
		comment_btn_clicked = false;
	}
});

comment_cancel_button.addEventListener("click", function(){
	comment_container.style.visibility = "hidden";
	comment_btn_clicked = false;
}, false);

//----- SHORTCUTS CONTROLS -------
document.addEventListener("keydown", function(e){
	if(!e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey && !comment_btn_clicked){
		switch(e.key){
			case " ": //Barra de Espaço
					if(video.paused)
						video.play();
					else
						video.pause();
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