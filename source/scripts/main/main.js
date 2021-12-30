//@prepros-prepend ../jquery-3.6.0.min.js
//@prepros-prepend ../join.js
//@prepros-append ../player.js
//@prepros-prepend ../aos.min.js
//@prepros-prepend ../swiper.min.js

$(".title").attr("data-aos", "zoom-out-down");
$(".subtitle").attr({
	"data-aos": "zoom-out-down",
	"data-aos-delay": "200",
});
$(".title-decoration").attr({
	"data-aos": "zoom-out-down",
	"data-aos-delay": "100"
});
$(".btn").parent().attr("data-aos", "zoom-in");

document.querySelectorAll(".header__item_weight-version").forEach(el => {
	el.innerText = el.nextSibling.nextElementSibling.textContent;
});

AOS.init({
	// Global settings:
	disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
	startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
	initClassName: 'aos-init', // class applied after initialization
	animatedClassName: 'aos-animate', // class applied on animation
	useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
	disableMutationObserver: false, // disables automatic mutations' detections (advanced)
	debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
	throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


	// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
	offset: 40, // offset (in px) from the original trigger point
	delay: 0, // values from 0 to 3000, with step 50ms
	duration: 600, // values from 0 to 3000, with step 50ms
	easing: 'ease', // default easing for AOS animations
	once: false, // whether animation should happen only once - while scrolling down
	mirror: false, // whether elements should animate out while scrolling past them
	anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

let
	trackList = [
		{
			trackName: "Destiny",
			typeBeat: "_Landon Cube_ Type Beat",
			musicalCharacteristic: "145|Cm"
		},
		{
			trackName: "Mental Suffering",
			typeBeat: "_Lil Gnar_ Type Beat",
			musicalCharacteristic: "150|Fm"
		},
		{
			trackName: "Fleeting Motions",
			typeBeat: "_Polo G_ Type Beat",
			musicalCharacteristic: "200|Gm"
		},
		{
			trackName: "Midnight Sigh",
			typeBeat: "_Lil Skies_ Type Beat",
			musicalCharacteristic: "145|Gm"
		},
		{
			trackName: "Sunset",
			typeBeat: "_StaySolidRocky_ Type Beat",
			musicalCharacteristic: "145|Em"
		},
		{
			trackName: "Life In Fear",
			typeBeat: "_Comethazine_ Type Beat",
			musicalCharacteristic: "130|Gm"
		},
		{
			trackName: "Rockstar",
			typeBeat: "_Post Malone_ Type Beat",
			musicalCharacteristic: "145|C#m"
		},
		{
			trackName: "Ocean View",
			typeBeat: "_Landon Cube_ Type Beat",
			musicalCharacteristic: "120|Fm"
		},
		{
			trackName: "Zoom Past",
			typeBeat: "_Lil Skies_ Type Beat",
			musicalCharacteristic: "150|Gm"
		},
	],
	nowBackground 			= "",
	as 						= 280,
	playerBackgroundTimeout;

let trackIndex = 1;
trackList.forEach(function(object){
	let
		catalog 					= replaceAllLetters(object.trackName.toLowerCase(), " ", "-"),
		typeBeat 				= object.typeBeat,
		characteristics 		= object.musicalCharacteristic.split("|");
	
	typeBeat = typeBeat.replace("_", '<span class="audio__type-beat">').split("").reverse().join("");
	typeBeat = typeBeat.replace("_", '</span>'.split("").reverse().join(""));
	typeBeat = typeBeat.split("").reverse().join("");

	characteristics[1] = replaceAllLetters(characteristics[1], "#", '<span class="icon-sharp"></span>');

	document.querySelector(".review__list").innerHTML +=
	`<div class="review__audio-item">
		<div class="audio musitem df" data-listen="${catalog}" data-index="${trackIndex}">
			<div class="audio__preview">
				<div class="audio__preview-background bgi"></div>
				<span class="icon-play"></span>
				<span class="icon-pause"></span>
			</div>
			<div class="audio__text-block df">
				<h4 class="audio__title">${object.trackName}</h4>
				<div class="audio__text">
					<p class="audio__text-line audio__text-line_1">${typeBeat}</p>
					<p class="audio__text-line audio__text-line_2"><span class="icon-bpm"></span> ${characteristics[0]} <span class="icon-music-key"></span> ${characteristics[1]}</p>
				</div>
				<div class="audio__link-block">
					<a class="audio__link" href="store/?open-popup=${catalog}" target="_blank">Get It</a>
				</div>
			</div>
		</div>
	</audio>`;

	trackIndex++;
});

function setPlayerBackground(trackName){
	document.querySelector(".review__player-background").style.backgroundImage = `url("audio/${trackName}/preview_min.jpg")`;
};

function editPlayerBackground(){
	$(".review__player-background").addClass("review__player-background_hide");

	clearTimeout(playerBackgroundTimeout);
	playerBackgroundTimeout = setTimeout(() => {
		setPlayerBackground(nowPlaing);
		$(".review__player-background").removeClass("review__player-background_hide");
	}, 200);
};

function replaceAllLetters(str, substr1, substr2){
	let res = "";

	for (let i = 0; i < str.length; i++){
		if (str[i] === substr1){
			res += substr2;
		} else {
			res += str[i]
		};
	};

	return res;
};

jQuery(document).ready(function(){

	function burgerToggle(){
		$(".player__down-block").toggleClass("player__down-block_lock player__down-block_hide");

		if (!$(".player").hasClass("player_hide")){
			$(".player").addClass("player_hide");
			$(".player__down-block").removeClass("player__down-block_opened");
		};

		$(".burger").toggleClass("burger_active");
		$(".header__column_2, .inner-shadow").toggleClass("show");
		$("body").toggleClass("lock");
	};

	$(".burger").on("click", burgerToggle);
	$(".inner-shadow").on("click", burgerToggle);

	function headerColorEdit(){
		if (window.pageYOffset > 0){
			$(".header").addClass("colored");
		} else {
			$(".header").removeClass("colored");
		};
	};

	function scrollItem(){
		$(".line__item").css("width", +window.pageYOffset.toFixed(3) / (document.body.offsetHeight - window.innerHeight) * 100 + "%");
  	};

	function motivParallax(){
		if (window.pageYOffset < $(".motivation").offset().top - window.innerHeight - 20 || window.pageYOffset >= $(".motivation").offset().top + $(".motivation").outerHeight() + 20){
			return;
		};

		let motivMargin;

		if (window.innerWidth > 5400){
			motivMargin = window.innerWidth / 20;
		} else if (window.innerWidth > 4600){
			motivMargin = window.innerWidth / 17;
		} else if (window.innerWidth > 2900){
			motivMargin = (window.innerWidth / 10);
		} else if (window.innerWidth > 2050){
			motivMargin = window.innerWidth / 12;
		} else if (window.innerWidth > 1600){
			motivMargin = window.innerWidth / 7.5;
		} else if (window.innerWidth > 1200){
			motivMargin = window.innerWidth / 6;
		} else if (window.innerWidth > 710){
			motivMargin = window.innerWidth / 4.8;
		} else  if (window.innerWidth > 480){
			motivMargin = window.innerWidth / 3;
		} else if (window.innerWidth > 355){
			motivMargin = window.innerWidth / 2.2;
		} else {
			motivMargin = window.innerWidth / 1.8;
		};

		motivMargin = +motivMargin.toFixed(4)

		$(".motivation__background").css("top", (window.pageYOffset / 10 - motivMargin).toFixed(3) + "px");
	};

	function showSectionNav(){
		let
			changed 			= false,
			py 				= window.pageYOffset;

		document.querySelectorAll('.header__item[data-scroll^="."]').forEach(function(el){
			let
				attr 	= el.getAttribute("data-scroll"),
				top 	= +($(attr).offset().top.toFixed(3));

			if (py + window.innerHeight - 250 >= top && py < top + $(attr).outerHeight() - 250){
				if (!el.classList.contains("header__item_active")){
					$(".header__item_active").removeClass("header__item_active");
				};

				el.classList.add("header__item_active");
				changed = true;
			};
		});

		if (!changed){
			$(".header__item_active").removeClass("header__item_active");
		};
	};
	
	let reviewContentLoad = false;
	function checkScrollForYoutube(){
		let py = window.pageYOffset;

		if (
			!reviewContentLoad &&
			py >= $(".review").offset().top - window.innerHeight - 100 &&
			py <= $(".review").offset().top + $(".review").outerHeight()
		){
			$(".review__clip_1").html(clip1);
			$(".review__clip_2").html(clip2);

			editPlayerBackground();

			document.querySelectorAll(".musitem").forEach(function(el, index){
				let catalog = el.getAttribute("data-listen");

				document.querySelectorAll(".audio__preview-background")[index].style.backgroundImage = `url("audio/${catalog}/preview.jpg")`;
			});

			reviewContentLoad = true;
		};
	};

	let playerOpened = false;
	function editNavigationOnScroll(){
		let py = window.pageYOffset;

		let
			val1 = +(window.pageYOffset + $(".page").outerHeight() - 240).toFixed(2),
			val2 = +($(".page__arrow-block").offset().top).toFixed(2);

		if (!$(".player").hasClass("player_hide") && !playerOpened){
			playerOpened = true;
		};

		if (py >= $(".footer").offset().top - window.innerHeight){
			$(".header").addClass("header_hided");
			$(".social__item").addClass("social__item_hided");
			$(".player__down-block").addClass("player__down-block_lock player__down-block_hide");
			$(".player__down-block").removeClass("player__down-block_opened");
			$(".player").addClass("player_hide");
		} else if(val1 < val2){
			$(".player__down-block").addClass("player__down-block_lock player__down-block_hide");
			$(".player__down-block").removeClass("player__down-block_opened");
			$(".player").addClass("player_hide");
		} else {
			$(".header").removeClass("header_hided");
			$(".social__item").removeClass("social__item_hided");
			$(".player__down-block").removeClass("player__down-block_lock player__down-block_hide");

			if (playerOpened){
				$(".player").removeClass("player_hide");
				$(".player__down-block").addClass("player__down-block_opened");

				playerOpened = false;
			};
		};
	};

	showSectionNav();
	headerColorEdit();
	scrollItem();
	motivParallax();
	checkScrollForYoutube();
	setTimeout(() => {
		editNavigationOnScroll();
	}, 80);

	$(window).on("scroll", function(){
		let py = window.pageYOffset;

		headerColorEdit();
		scrollItem();
		motivParallax();
		showSectionNav();
		checkScrollForYoutube();
		editNavigationOnScroll();

		$(".page__parallax").css("top", (py / 4).toFixed(3) + "px");
	});

	function avatarResize(){
		$(".page__image-block").css("height", $(".page__image-block").innerWidth() + "px");
	};

	let aosDelayArray = [];

	document.querySelectorAll(".price").forEach(function(el){
		let attr = el.getAttribute("data-aos-delay");

		if (!attr){
			aosDelayArray.push("0");
			return;
		};

		aosDelayArray.push(attr);
	});

	function editAosAtPrice(){
		let ww = window.innerWidth;

		if (ww < 690){
			$(".price").attr("data-aos-delay", "0")
		} else if (
			document.querySelectorAll(".price")[1].getAttribute("data-aos-delay") !== aosDelayArray[1]){
			document.querySelectorAll(".price").forEach(function(el, index){
				el.setAttribute("data-aos-delay", aosDelayArray[index]);
			});
		};
	};

	function priceVisibility(){
		let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);

		if (isMobile){
			$(".price").removeClass("price_desktop");
		} else {
			$(".price").addClass("price_desktop");
		};
	};

	editAosAtPrice();
	avatarResize();
	priceVisibility();

	window.addEventListener("resize", function(){
		avatarResize();
		motivParallax();
		editAosAtPrice();
		checkScrollForYoutube();
		priceVisibility();
	});

	let scrollBool = true, scrollSpeed = 600;
	function scrollTo(px){
		if (scrollBool){
			scrollBool = false;
			setTimeout(() => {
				scrollBool = true;
			}, scrollSpeed);

			$([document.documentElement, document.body]).animate({
				scrollTop: px
			}, scrollSpeed);
		};
	};

	let delayForSocialItem = 50;
	setTimeout(() => {
		document.querySelectorAll(".social__item").forEach(function(el, index){
			if (index){
				el.style.transitionDelay = delayForSocialItem + "ms";
			};

			el.style.transitionDuration = as + "ms";
			delayForSocialItem += 50;
		});
	}, +$(".social__item:last-child").attr("data-aos-delay") + 100);

	$(".header__logo").on("click", function(){
		if ($(".burger").hasClass("burger_active")){
			burgerToggle();
			$(".header__column_2, .inner-shadow").removeClass("show");
		};
		
		scrollTo( 0 );
	});

	$(".header__logo").on("mousedown pointerdown", function(){
		if (window.pageYOffset){
			$(this).addClass("header__logo_clicked");
		};
	});

	$(".header__logo").on("mouseout mouseup pointerup pointerout", function(){
		$(".header__logo").removeClass("header__logo_clicked");
	})

	$(".footer__logo").on("click", function(){
		$(this).addClass("footer__logo_clicked");
		setTimeout(() => {
			$(this).removeClass("footer__logo_clicked");
		}, 210);
		
		scrollTo( 0 );
	});
	
	$(".footer__logo").on("mousedown pointerdown", function(){
		if (window.pageYOffset){
			$(this).addClass("footer__logo_clicked");
		};
	});

	$(".footer__logo").on("mouseout mouseup pointerup pointerout", function(){
		$(this).removeClass("footer__logo_clicked");
	});

	$("[data-scroll]").on("click", function(){
		let margin = window.innerWidth >= 768 ? 92 : 64;
		
		if ($(".burger").hasClass("burger_active")){
			burgerToggle();
		};

		scrollTo( $( $(this).attr("data-scroll") ).offset().top - $(".header").outerHeight());
	});

	function buttonEvent(e, el){
		$(el).children(".btn__circle").css({
			"top": e.offsetY + "px",
			"left": e.offsetX + "px"
		});
	};

	$(".btn").on("mouseenter", function(e){
		buttonEvent(e, this)
	});

	$(".btn").on("mouseleave", function(e){
		buttonEvent(e, this)
	});

	for (let i = 0; i < document.querySelectorAll(".page [data-aos]").length - 1; i++){
		document.querySelectorAll(".page [data-aos]")[i].setAttribute("data-aos-offset", "0");
	};
	$(".page__arrow-block").attr("data-aos-offset", "0");

	for (let elem of document.getElementsByClassName("equalizer__item")){
		let animation = Math.ceil( Math.random() * 2 );

		elem.style.animationName = "equalizer_" + animation;
	};

	$(".faq__btn").on("click", function(){
		$(".faq__link").css("margin", "0")
		$(this).fadeOut(as);
	});

	new Swiper(".services__slider", {
		pagination: {
			el: ".services__pagination",
			clickable: true,
		},

		keyboard: {
			enabled: true,
			onlyInViewport: true
		},

		touchRatio: 1,
		touchAngle: 35,
		grabCursor: true,
		speed: 500,
		watchOverflow: true,
		autoHeight: true,
		loop: false,

		breakpoints: {
			300: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			610: {
				slidesPerView: 2,
				spaceBetween: 20,
				centeredSlides: false
			},
			910: {
				slidesPerView: 3,
				initialSlide: 1,
				centeredSlides: false,
				spaceBetween: 25,
			},
		},
	});
});

window.onload = function () {
	deletePreloader();
};