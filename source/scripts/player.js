let player = document.createElement("div");

document.querySelector(".beforePlayer").insertAdjacentElement("afterend", player);

player.innerHTML =
`<div class="player__wrapper">
	<div class="player__down-block">
		<div class="player__down-inner">
			<svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M77.032 0.196984C77.7103 -0.0656615 78.813 -0.0656615 79.4913 0.196984C80.1696 0.45963 80.1696 0.88662 79.4914 1.14933L41.2297 15.9653C40.8922 16.0973 40.4471 16.1633 40.0018 16.1633C39.5565 16.1633 39.1114 16.0972 38.7705 15.9666L0.508722 1.15065C-0.169554 0.888009 -0.169554 0.46102 0.508722 0.198374C1.187 -0.0642723 2.28968 -0.0642723 2.96796 0.198374L40.0018 14.5375L77.032 0.196984ZM77.032 8.03375C77.7103 7.77111 78.813 7.77111 79.4913 8.03375C80.1695 8.2964 80.1695 8.72339 79.4914 8.9861L41.2297 23.802C40.8922 23.9341 40.4471 24 40.0018 24C39.5565 24 39.1114 23.934 38.7705 23.8034L0.508707 8.98742C-0.169569 8.72478 -0.169569 8.29779 0.508707 8.03514C1.18698 7.77249 2.28967 7.77249 2.96794 8.03514L40.0018 22.3742L77.032 8.03375Z" fill="#ECF1FF"/></svg>
		</div>
	</div>
	<div class="player__progress-block df">
		<input class="player__progress" type="range" value="0" min="0" id="progress">
		<span class="player__progress-thumb" style="left: 0;" id="thumb"></span>
		<span class="player__progress-track" style="width: 0;"></span>
		<span class="player__progress-track_hover"></span>
		<div class="player__progress-time-block">
			<div class="player__progress-time-inner">
				<span class="player__progress-time unselect" id="progress-time">0:00</span>
			</div>
		</div>
	</div>
	<div class="player__row df">
		<div class="player__column player__column_1 df">
			<div class="player__preview-block df">
				<div class="player__preview bgi"></div>
				<div class="player__text-block df">
					<div class="player__track-name">Track Name</div>
					<div class="player__type-beat"><span class="player__type-beat-artist">Artist</span> Type Beat</div>
				</div>
			</div>
		</div>
		<div class="player__column player__column_2 df">
			<div class="player__panel df">
				<div class="player__panel-column player__panel-column_2">
					<span class="player__panel-timer" id="currentTime">0:00</span>
				</div>
				<div class="player__panel-column player__panel-column_2">
					<button class="player__panel-btn player__panel-btn_skip" id="prev"><span class="icon-back"></span></button>
				</div>
				<div class="player__panel-column player__panel-column_3">
					<button class="player__panel-btn player__panel-btn_play-pause player__panel-btn_paused" id="play-pause">
						<span class="icon-play"></span>
						<span class="icon-pause"></span>
					</button>
				</div>
				<div class="player__panel-column player__panel-column_4">
					<button class="player__panel-btn player__panel-btn_skip" id="next"><span class="icon-next"></span></button>
				</div>
				<div class="player__panel-column player__panel-column_5">
					<span class="player__panel-timer" id="remained">0:00</span>
				</div>
			</div>
		</div>
		<div class="player__column player__column_3 df">
			<div class="player__volume-block">
				<div class="player__btn-block">
					<button class="player__volume-btn" id="volume-btn">
						<div class="player__volume-icon-block"></div>
						<div class="player__volume-panel df" id="volume-panel">
							<div class="player__volume-value"></div>
							<input class="player__volume" type="range" min="0" max="100" id="volume-range">
						</div>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>`;

player.classList.add("player");
player.classList.add("player_hide");

let
	progress 				= document.getElementById("progress"),
	thumb 					= document.getElementById("thumb"),
	progressTrack 			= document.querySelector(".player__progress-track"),
	progressTrackHover 	= document.querySelector(".player__progress-track_hover"),
	timer 					= document.getElementById("progress-time"),
	prevBtn 					= document.getElementById("prev"),
	nextBtn 					= document.getElementById("next"),
	timeCounter				= document.getElementById("currentTime"),
	remained 				= document.getElementById("remained"),
	plaingBtn 				= document.getElementById("play-pause"),
	audio 					= document.getElementById("audio"),
	volumePanel				= document.getElementById("volume-panel"),
	volumeBtn				= document.getElementById("volume-btn"),
	volumeRange 			= document.getElementById("volume-range"),
	down 						= document.querySelector(".player__down-block"),

	page 						= isStore ? "lastStoreTrack" : "lastTrack",
	lastTrack 				= localStorage.getItem(page),
	lastVolume 				= localStorage.getItem("lastVolume"),
	listened 				= localStorage.getItem("listened"),
	nowPlaing 				= document.getElementsByClassName("musitem")[0].getAttribute("data-listen"),
	lastIndex 				= document.getElementsByClassName("musitem").length,
	volume 					= 100,
	playerFrames 			= 4,
	changeBool				= false,
	scrollingList 			= false,
	generationCount 		= isStore ? 5 : 2;

let
	params = {},
	paramsArray = window.location.search.substr(1).split("&");

if (paramsArray[0] !== ''){
	paramsArray.forEach(function(item){
		let values = item.split("=");
	
		params[values[0]] = values[1];
	});
};

if (lastTrack && !("listen" in params)){
	nowPlaing = lastTrack;
	audio.setAttribute("preload", "auto");
	$(`.musitem[data-listen="${nowPlaing}"]`).addClass("musitem_active");
};

let scrollingToTrack = false;
function scrollToTrack(trackName){
	if (scrollingToTrack){
		return;
	};

	let scrollToVal = document.querySelector(".musitem[data-listen=\"" + trackName + "\"]").parentElement.offsetTop;

	scrollingToTrack = true;

	$(".musitem-list").scrollTop(scrollToVal);
	scrollTo($(".musitem-list").offset().top - $(".header").outerHeight() - 25);

	setTimeout(() => {
		$(`.musitem[data-listen="${trackName}"]`).addClass("blink");

		setTimeout(() => {
			$(`.musitem[data-listen="${trackName}"]`).removeClass("blink");
			scrollingToTrack = false;
		}, 3000);
	}, scrollSpeed + 200);

	$(".player").removeClass("player_hide");
	$(".player__down-block").addClass("player__down-block_opened");

	let outWay = isStore ? "../" : "";

	nowPlaing = trackName;

	audio.setAttribute("src", outWay + "audio/" + trackName + "/track.mp3");
	setTrackInfo( getTrackInfo(trackName) );

	audio.onloadedmetadata = function(){
		progress.setAttribute("max", Math.floor(audio.duration) * playerFrames);
		
		showTimeInfo();
		audio.onloadedmetadata = null;
	};

	$(".musitem").removeClass("musitem_active");
	$(`.musitem[data-listen="${trackName}"]`).addClass("musitem_active");
};

scrollListTo(nowPlaing);

listened === "true" ? $(down).fadeIn(0) : $(down).fadeOut(0);

if (lastVolume){
	audio.volume = +lastVolume;
	volume = +lastVolume * 100;
};
editVolumeIcon();
volumeRange.value = volume;
$(".player__volume-value").text(volume.toFixed(0));

$("#volume-panel").fadeOut(0);

let outWay = isStore ? "../" : "";

audio.setAttribute("src", outWay + "audio/" + nowPlaing + "/track.mp3");

audio.onloadedmetadata = function(){
	progress.setAttribute("max", audio.duration * playerFrames + "");
	showTimeInfo();

	audio.onloadedmetadata = null;
};

$(".player__volume-panel, .player__progress-time-block").fadeOut(0);




// TRACK INFO
let endTimeout, waitTimeout, progressTimeout1, progressTimeout2, progressTimeout3, listenContinue = false;
function startProgress(timeByInput = -1){
	console.log("START");
	let
		time = audio.currentTime,
		duration = audio.duration;
	
	if (timeByInput !== -1){
		progressTrack.style.transition = thumb.style.transition = "none";
		let nowPos = timeByInput ? (timeByInput / duration * 100 ).toFixed(4) : "0";
		progressTrack.style.width = progressTrackHover.style.width = thumb.style.left = nowPos + "%";
		clearInterval( startTimerInterval );
		showTimeInfo(timeByInput);
		return;
	};

	if (audio.paused){
		return;
	};

	clearInterval( startTimerInterval );
	startTimerInterval = setInterval(showTimeInfo, 500);
	showTimeInfo(time);
	
	clearTimeout( endTimeout );
	endTimeout = setTimeout(() => {
		if (audio.ended && !document.hidden){
			brokeProgress((duration - time) * 1000);
		} else if (document.hidden){
			progressTrack.style.width = thumb.style.left = progressTrackHover.style.width = "0";
			progressTrack.style.transition = thumb.style.transition = progressTrackHover.style.transition = "0s";
			listenContinue = true;
		} else {
			startProgress();
			return;
		};
	}, (duration - time) * 1000);

	let nowPos = time ? (time / duration * 100).toFixed(4) : "0";
	progressTrack.style.width = progressTrackHover.style.width = thumb.style.left = nowPos + "%";

	if (!time){
		progressTrack.style.transition = thumb.style.transition = "none";
		clearTimeout( progressTimeout3 );
		progressTimeout3 = setTimeout(() => {
			progressTrack.style.width = thumb.style.left = "0";
		}, 60);
	};

	clearTimeout( progressTimeout1 );
	progressTimeout1 = setTimeout(() => {
		progressTrack.style.transition = thumb.style.transition = (duration - time).toFixed(4) + "s linear";
		
		clearTimeout( progressTimeout2 );
		progressTimeout2 = setTimeout(() => {
			progressTrack.style.width = thumb.style.left = "100%";
		}, 120);
	}, 100);
};

function pauseProgress(){
	console.log("PAUSE");
	clearTimeout( endTimeout );
	progressTrack.style.width = thumb.style.left = progressTrack.clientWidth + "px";
};

function brokeProgress(isNaNArgument){
	console.log("BROKE");

	if (isNaN(isNaNArgument)){
		return;
	};

	progressTrack.style.transition = thumb.style.transition = "none";

	clearTimeout( endTimeout );

	playMusic( skipToNext(nowPlaing) );
};

function getTrackInfo(catalog){
	for (let i = 0; i < trackList.length; i++){
		let object = trackList[i];

		if (replaceAllLetters(object.trackName.toLowerCase(), " ", "-") === catalog){
			return object;
		};
	};

	return false;
};

function setTrackInfo(trackInfo){
	if (!trackInfo){
		return;
	};
	let typeBeatCode = trackInfo.typeBeat, outWay = isStore ? "../" : "";
	typeBeatCode = typeBeatCode.replace("_", '<span class="player__type-beat-artist">').split("").reverse().join("");
	typeBeatCode = typeBeatCode.replace("_", "</span>".split("").reverse().join(""));
	typeBeatCode = typeBeatCode.split("").reverse().join("");

	document.querySelector(".player__track-name").innerText = trackInfo.trackName;
	document.querySelector(".player__type-beat").innerHTML = typeBeatCode;
	document.querySelector(".player__preview").style.backgroundImage = `url("${outWay}audio/${nowPlaing}/preview_min.jpg")`;
};

setTrackInfo( getTrackInfo(nowPlaing) );

function showTimeInfo(timeOnInput = -1){
	let
		duration 		= Math.floor(audio.duration),
		seconds 			= timeOnInput !== -1 ? Math.floor(timeOnInput) : Math.floor(audio.currentTime),
		listenedSec 	= seconds % 60 + "", remainedSec = (duration - seconds) % 60 + "";

	while (listenedSec.length < 2){
		listenedSec = "0" + listenedSec;
	};

	while (remainedSec.length < 2){
		remainedSec = "0" + remainedSec;
	};

	if (isNaN(remainedSec)){
		return;
	};

	timeCounter.innerText = Math.floor(seconds / 60 % 60) + ":" + listenedSec;
	remained.innerText = "-" + Math.floor((duration - seconds) / 60 % 60) + ":" + remainedSec;
};




// PLAING MUSIC

let skipTrackBool = true;
function changeTrack(){
	if (!skipTrackBool){
		return;
	};

	progressTrack.style.width = thumb.style.left = progressTrackHover.style.width = progressTrack.clientWidth + "px";
	progressTrack.style.transition = thumb.style.transition = ".25s";

	setTimeout(() => {
		if (!audio.duration){
			progressTrack.style.width = thumb.style.left = progressTrackHover.style.width = "0";
		};
	}, 50);

	let outWay = isStore ? "../" : "";

	audio.setAttribute("src", outWay + "audio/" + nowPlaing + "/track.mp3");
	audio.setAttribute("preload", "auto");

	audio.onloadedmetadata = function(){
		progress.setAttribute("max", Math.floor(audio.duration) * playerFrames);
		
		audio.play();
		showTimeInfo();
		startProgress();
		audio.onloadedmetadata = null;
	};

	skipTrackBool = false;
	setTimeout(() => {
		skipTrackBool = true;
	}, 400);
};

function pauseMusic(){
	audio.pause();
	pauseProgress();
};


let startTimerInterval;
function playMusic(trackName){
	if (!bodyClicked){
		return;
	};

	let
		trackInfo = getTrackInfo(trackName),
		changeBool = trackName !== nowPlaing;

	if (!trackInfo){
		console.log("Track Info Error");
		return;
	};

	localStorage.setItem("listened", "true");

	if (trackName === nowPlaing && !audio.paused){
		clearInterval( startTimerInterval );
		pauseMusic();
		$(`.audio`).removeClass("audio_plaing");
		plaingBtn.classList.add("player__panel-btn_paused");
		return;
	} else if(!changeBool){
		$("iframe").each(function() {
			$(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
		});
		audio.play();
		startProgress();
		startTimerInterval = setInterval(showTimeInfo, 500);
		showTimeInfo();
	};

	nowPlaing = trackName;

	if (!isStore && changeBool){
		editPlayerBackground(nowPlaing);
	};

	if (changeBool){
		changeTrack(trackName);
	};

	$(".audio").removeClass("audio_plaing musitem_active");
	$(`.musitem[data-listen="${trackName}"]`).addClass("audio_plaing musitem_active");
	plaingBtn.classList.remove("player__panel-btn_paused");

	plaingBtn.focus();

	setTrackInfo(trackInfo);
	scrollListTo(trackName);
};

function scrollListTo(trackName){
	if (scrollingList && !isStore){
		return;
	};

	scrollingList = true;

	let list = document.getElementById("musitem-list");

	if (!list || !list.classList.contains("review__list") || !document.querySelector(`.musitem[data-listen="${trackName}"]`)){
		return;
	};

	let pos = document.querySelector(`.musitem[data-listen="${trackName}"]`).offsetTop;
	$("#musitem-list").animate({
		scrollTop: pos - 15
	}, 200);

	setTimeout(() => {
		scrollingList = false;
	}, 200);
};





// VOLUME

function editVolumeIcon(){
	if (volume > 40){
		document.querySelector(".player__volume-icon-block").innerHTML = '<span class="icon-speaker_medium"></span>';
	} else if (volume > 0){
		document.querySelector(".player__volume-icon-block").innerHTML = '<span class="icon-speaker_low"></span>';
	} else {
		document.querySelector(".player__volume-icon-block").innerHTML = '<span class="icon-speaker_mute"></span>';
	};
};

volumeRange.addEventListener("input", function(){
	let value = volumeRange.value;
	volume = value;

	audio.volume = volume * .01;

	editVolumeIcon();
	$(".player__volume-value").text(value);
	localStorage.setItem("lastVolume", volume * .01);
});

$(".player__volume-btn").on("focus mouseenter", function(){
	$("#volume-panel").fadeIn(180);
	volumeRange.focus();
});

volumeBtn.addEventListener("mouseleave", function(){
	$("#volume-panel").fadeOut(180);
	document.body.focus();
});




// EVENTS

function skipToPrev(trackName){
	let index = +$(`.musitem[data-listen="${trackName}"]`).attr("data-index"), prevIndex;

	prevIndex = --index < 1 ? lastIndex : index;

	return document.querySelectorAll(".musitem")[prevIndex - 1].getAttribute("data-listen");
};

function skipToNext(trackName){
	let index = +$(`.musitem[data-listen="${trackName}"]`).attr("data-index"), nextIndex;

	nextIndex = ++index > lastIndex ? 1 : index;

	return document.querySelectorAll(".musitem")[nextIndex - 1].getAttribute("data-listen");
};

function progressTo(newCurrentTime){
	audio.currentTime = newCurrentTime;
};

let bodyClicked = false;
$("*").on("click", function(){
	bodyClicked = true;
});

document.querySelectorAll(`.audio__link`).forEach(function(a){
	a.onclick = e => {
		e.stopPropagation();
	};
});

$(".musitem").on("click", function(e){
	if (e.target.classList.contains("audio__icon") || e.target.classList.contains("audio__add") || e.target.classList.contains("audio__share") || e.target.classList.contains("audio__download") || e.target.classList.contains("audio__tools-btn")){
		return;
	};

	playMusic( $(this).attr("data-listen") );
	player.classList.remove("player_hide");
	down.classList.add("player__down-block_opened");
	$(down).fadeIn(as);
});

let percentProgress;
progress.addEventListener("mousemove",function(e){
	let
		max = +progress.getAttribute("max") / playerFrames,
		position = Math.round(e.clientX / (window.innerWidth / max)),
		seconds = position % 60;

	while ((seconds + "").length < 2){
		seconds = "0" + seconds;
	};
	
	percentProgress = +(e.clientX / document.querySelector(".player__progress-block").clientWidth * 100).toFixed(3);
	timer.innerText = Math.floor(position / 60) % 60 + ":" + seconds;

	$(".player__progress-time-block").css("left", percentProgress + "%").fadeIn(as);
	progressTrackHover.style.width = percentProgress + "%";
});

progress.addEventListener("mouseleave",function(){
	$(".player__progress-time-block").fadeOut(as);
	progressTrackHover.style.width = "0";
});

progress.addEventListener("input", function(){
	let value = progress.value;
	startProgress(value / playerFrames);
});

let backProgressTimeout;
progress.addEventListener("change", function(){
	let value = progress.value;

	audio.currentTime = value / playerFrames;
	if (!audio.paused){
		startProgress();
		$(".player__progress-time-block").fadeOut(as);
	};

	changeBool = true;
	clearTimeout( backProgressTimeout );
	backProgressTimeout = setTimeout(() => {
		progress.value = 2;
		changeBool = false;
	}, 300);
});

let clickBtnTimeout;
$(".player__panel-btn").on("click", function(){
	let btn = this;

	$(this).addClass("player__panel-btn_pressed");

	clearTimeout(clickBtnTimeout);
	clickBtnTimeout = setTimeout(() => {
		$(btn).removeClass("player__panel-btn_pressed");
	}, 140);
});

plaingBtn.addEventListener("click", function(){
	playMusic(nowPlaing);
});

prevBtn.addEventListener("click", function(){
	if (audio.currentTime < 5 && skipTrackBool){
		playMusic( skipToPrev(nowPlaing) );
	} else if (skipTrackBool){
		progressTo(0);
		startProgress();
	};
});

nextBtn.addEventListener("click", function(){
	if (skipTrackBool){
		playMusic( skipToNext(nowPlaing) );
	};
});

progress.addEventListener("keydown", function(e){
	e.preventDefault();
});

document.addEventListener("keyup", function(e){
	if (e.key === "Escape" && !down.classList.contains("player__down-block_lock") && localStorage.getItem("listened")){
		if (isStore && document.querySelector(".popup.popup_active") && !!closePopup){
			closePopup();
			return;
		};

		$(".player").toggleClass("player_hide");
		$(".player__down-block").toggleClass("player__down-block_opened");
	};

	if (e.ctrlKey || ($(".player").hasClass("player_hide") && audio.paused )){
		return;
	};

	if (e.key === "MediaTrackPrevious"){
		if (audio.currentTime < 5 && skipTrackBool){
			playMusic( skipToPrev(nowPlaing) );
		} else if (skipTrackBool){
			progressTo(0);
			startProgress();
		};
	} else if (e.key === "MediaTrackNext" && skipTrackBool){
		playMusic (skipToNext(nowPlaing) );
	} else if (e.key === "MediaPlayPause"){
		playMusic( nowPlaing );
	};
});

down.addEventListener("click", function(e){
	if (this.classList.contains("player__down-block_lock")){
		return;
	};

	player.classList.toggle("player_hide");

	if (player.classList.contains("player_hide")){
		down.classList.remove("player__down-block_opened")
	} else {
		down.classList.add("player__down-block_opened")
	};
});






let played = false;
document.onvisibilitychange = function(){
	if (listenContinue){
		listenContinue = false;
		playMusic (skipToNext(nowPlaing) );
		return;
	};

	if (!audio.paused && document.hidden && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		played = true;
		playMusic( nowPlaing );
	} else if(played){
		playMusic( nowPlaing );
		played = false;
	};
};

window.addEventListener("unload",function(){
	localStorage.setItem(page, nowPlaing);
});

window.addEventListener("storage", function(){
	let lastVolume = +(+localStorage.getItem("lastVolume")).toFixed(2) * 100;
	if (volume !== lastVolume){

		volume = lastVolume;
		volumeRange.value = volume

		audio.volume = volume * .01;

		editVolumeIcon();
		$(".player__volume-value").text(volume);
	};
});



function returnCatalogFormat(title){
	return replaceAllLetters(title.toLowerCase(), " ", "-");
};

// GENERATION СACHE
function startGeneration (){
	let
		upCatalog = isStore ? "../" : "",
		indexOfMedia = [],
		countOfEnded = 0;
	
	$("body").append(
		`<div class="generator"></div>`
	);

	for (let i = 0; i < generationCount; i++){
		let catalog = returnCatalogFormat(trackList[i].trackName);
		indexOfMedia.push(i);

		let audio = document.createElement("audio");

		document.querySelector(".generator").appendChild(audio);

		audio.classList.add("generator__audio");
		audio.classList.add(`generator__audio_${i + 1}`);

		audio.setAttribute("src", `${upCatalog}audio/${catalog}/track.mp3`);
		audio.setAttribute("preload", "auto");

		if (audio){
			audio.onloadedmetadata = function(){
				indexOfMedia[i] = indexOfMedia[i] + generationCount;

				if (trackList[indexOfMedia[i]]){
					catalog = returnCatalogFormat(trackList[indexOfMedia[i]].trackName);
				} else {
					countOfEnded++;
					audio.onloadedmetadata = null;

					if (countOfEnded === generationCount){
						document.querySelector(".generator").parentNode.removeChild(document.querySelector(".generator"));
					};

					return;
				};

				audio.setAttribute("src", `${upCatalog}audio/${catalog}/track.mp3`)
			};
		};
	};
};

function deletePreloader(){
	let preloader = document.querySelector(".preloader");
	
	if (!isStore){
		document.querySelectorAll(".equalizer__item").forEach(function(elem){
			let duration = Math.ceil( Math.random() * 10) * 220 + 900;
			
			elem.style.animationDuration = duration + "ms";
		});

		setTimeout(() => {
			$(".equalizer__item").css("animation-play-state", "paused");
		}, 60);
	};

	preloader.classList.add("preloader_hide");
	setTimeout(function(){
		preloader.parentNode.removeChild(preloader);
	}, 280);

	startGeneration();

	document.body.removeAttribute("style");
};