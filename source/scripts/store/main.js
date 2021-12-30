//@prepros-prepend ../jquery-3.6.0.min.js
//@prepros-prepend ../join.js
//@prepros-append ../player.js
//@prepros-prepend start.js
//@prepros-prepend secret.js
//@prepros-prepend ../swiper.min.js

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

function reverseNameFormat(value, from = "key", to = "catalog"){
	// "from" or "to" can be: catalog, key, title
	let doubleValue = value[0].toLowerCase();

	if (from == to){
		return;
	};

	if (from === "key"){


		if (to === "catalog"){

			for (let i = 1; i < value.length; i++){

				if (value[i] === value[i].toUpperCase()){
					doubleValue += "-" + value[i].toLowerCase();
					continue;
				};
	
				doubleValue += value[i].toLowerCase();
			};

			return doubleValue;

		} else if (to === "title"){

			doubleValue = doubleValue.toUpperCase();

			for (let i = 1; i < value.length; i++){

				if (value[i] === value[i].toUpperCase()){
					doubleValue += " " + value[i];
					continue;
				};
	
				doubleValue += value[i].toLowerCase();
			};

			let indexOfAnd = doubleValue.indexOf("And")

			if (indexOfAnd !== -1){
				doubleValue = doubleValue.substr(0, indexOfAnd) + "and " + doubleValue.substr(indexOfAnd + 4, doubleValue.length)
			};

			return doubleValue;

		};


	} else if (from === "catalog"){


		let convertCase = false;

		if (to === "key"){
			
			for (let i = 1; i < value.length; i++){

				if (value[i] === "-" && value[i + 1]){
					doubleValue += value[i + 1].toUpperCase();
					convertCase = true;
					continue;
				};
				
				if (!convertCase){
					doubleValue += value[i];
				} else {
					convertCase = false;
				};
			};

			return doubleValue;

		} else if (to === "title"){

			doubleValue = doubleValue.toUpperCase();

			for (let i = 1; i < value.length; i++){

				if (value[i] === "-" && value[i + 1]){
					doubleValue += " " + value[i + 1].toUpperCase();
					convertCase = true;
					continue;
				};

				if (!convertCase){
					doubleValue += value[i];
				} else {
					convertCase = false;
				};
			};

			let indexOfAnd = doubleValue.indexOf("And")

			if (indexOfAnd !== -1){
				doubleValue = doubleValue.substr(0, indexOfAnd) + "and " + doubleValue.substr(indexOfAnd + 4, doubleValue.length)
			};

			return doubleValue;

		};


	} else if (from === "title"){


		if (to === "catalog"){

			return replaceAllLetters(value.toLowerCase(), " ", "-")

		} else if (to === "key"){

				doubleValue += replaceAllLetters(value.substr(1, value.length - 1), " ", "");

				return doubleValue;

		};


	};
};

let
	intervalList = [],
	timeoutList = [];

function resizeTrackTitles(){
	let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);

	document.querySelectorAll(".audio__title-inner").forEach(function(el, index){
		if (isMobile) {
			$(".musitem").addClass("audio_unhover");
		} else {
			$(".musitem").removeClass("audio_unhover");
		};

		let
			child = el.children[0],
			width = child.clientWidth;

		let scrollTiming = el.children[0].innerText.length * 50;

		el.style.transition = `transform ${scrollTiming}ms ease-out`;
		
		if (el.clientWidth < width){
			let
				audio = document.querySelector(`.audio[data-index="${index + 1}"]`),
				container = document.querySelectorAll(".audio__title-container")[index];

			if (!audio || !container) {
				return;
			};

			container.classList.add("audio__title-container_shadow");

			audio.addEventListener("mouseover", function(){
				el.classList.remove("audio__title-inner_faster");
				el.style.transform = "translate(-" + (width - el.clientWidth + 20) + "px, 0)";

				container.classList.remove("audio__title-container_stand");
				container.classList.remove("audio__title-container_stop");
			});

			audio.addEventListener("mouseleave", function(){
				el.classList.add("audio__title-inner_faster");
				el.style.transform = "translate(0, 0)";

				container.classList.add("audio__title-container_stand");
				container.classList.add("audio__title-container_stop");
			});
		} else {
			document.querySelectorAll(".audio__title-container")[index].classList.remove("audio__title-container_shadow");
		};
	});
};

let dblMax = maxCountOfServices > 9 ? 9 : maxCountOfServices;

for (let i = 0; i <= dblMax; i++){
	keys.push(i + "");
};

function scrollToSection(sectionClass, speed = "smooth"){
	if (!document.querySelector(sectionClass)){
		return;
	};

	let px = Math.ceil($(sectionClass).offset().top - $(".header").outerHeight() - 20);

	scrollTo(px, speed)
};

$(".header__item[data-section]").on("click", function(){
	scrollToSection( "." + this.getAttribute("data-section") );
});

function audioShareClick(el){
	$(".audio__tools_visible").removeClass("audio__tools_visible");

	let link = location.href,
	catalog = el.getAttribute("data-product");

	if (link.indexOf("?") !== -1){
		link = link = link.substr(0, link.indexOf("?"))
	} else {
		link = link.substr(0, link.lastIndexOf("/"))
	};

	if (link[link.length - 1] !== "/"){
		link += "/";
	};

	link += "?listen=" + catalog;

	if (navigator.clipboard){
		navigator.clipboard.writeText(link);
	} else {
		var
			aux = document.createElement("input");

		aux.setAttribute("value", link)
		document.body.appendChild(aux);

		aux.select();

		document.execCommand("copy");

		document.body.removeChild(aux);
	};
};

$(".audio__share").on("click", function(){
	audioShareClick(this);
});

$(".audio__tools-btn").on("click", function(){
	$(".audio__tools_visible").removeClass(".audio__tools_visible");

	let tools = $(this).siblings(".audio__tools");

	if (!tools.hasClass("audio__tools_visible")){
		$(".audio__share").on("click", function(){
			audioShareClick(this);
		});
	};

	tools.toggleClass("audio__tools_visible");
});

$(".audio__tools-btn").on("blur", function(){
	setTimeout(() => {
		$(".audio__tools_visible").removeClass("audio__tools_visible");
	}, 100);
});

$(".audio__share, .audio__download").on("mousedown pointerdown", function(){
	$(this).addClass("clicked");
});

$(".audio__share, .audio__download").on("mouseout mouseup pointerup pointerout", function(){
	$(this).removeClass("clicked");
});

resizeTrackTitles();

function returnProductHTML(type, productName){
	let code = ``, price = 0;

	if (type === "service"){
		let
			previewCode,
			productCount = cart.services[productName].count,
			doubleClassForPlusBtn = "",
			title = reverseNameFormat(productName, "key", "title");
		
		if (title === "Order"){
			title = "Beat for Order"
		};

		if (productCount === maxCountOfServices){
			doubleClassForPlusBtn = " product__btn_lock";
		};
		
		price = cart.services[productName].price * productCount;

		if (String(price).indexOf(".") !== -1){
			price += "0";
		};
		
		if (productName === "mixingAndMastering"){
			previewCode = '<span class="product__icon icon-hexagon"></span>';
		} else if(productName === "visual") {
			previewCode = '<span class="product__icon icon-visuals"></span>';
		} else {
			previewCode = `<span class="product__icon icon-${productName}"></span>`;
		};

		code =
		`<div class="basket__item product">
			<div class="product__row df">
				<div class="product__column product__column_1 df">
					<div class="product__preview-block">
						${previewCode}
					</div>
				</div>
				<div class="product__column product__column_2 df">
					<div class="product__content">
						<div class="product__title-row df">
							<h4 class="product__title">Service:</h4>
							<button class="product__close" data-product="${productName}">
								<span class="icon-close"></span>
							</button>
						</div>
						<div class="product__name">${title}</div>
						<div class="product__bottom-row product__bottom-row_service df">
							<div class="product__info-block">
								<div class="product__edit-row df">
									<div class="product__edit-wrap">
										<button class="product__btn product__btn_minus df" data-product="${productName}">-</button>
									</div>
									<div class="product__edit-wrap">
										<div class="product__count-box unselect" data-product="${productName}">${productCount}</div>
									</div>
									<div class="product__edit-wrap">
										<button class="product__btn product__btn_plus${doubleClassForPlusBtn} unselect df" data-product="${productName}" data-popup="${productName}" data-popup-type="service">+</button>
									</div>
								</div>
							</div>
							<div class="product__price" data-product="${productName}">$${price}</div>
						</div>
					</div>
				</div>
			</div>
		</div>`;
	} else if (type === "beat"){
		let
			catalog = reverseNameFormat(productName, "key", "catalog"),
			trackName = reverseNameFormat(productName, "key", "title"),
			beatType = cart.beats[productName].type;
		
		price = cart.beats[productName].prices[beatType];

		if (String(price).indexOf(".") !== -1){
			price += "0";
		};
		
		if (beatType === "wav"){
			beatType = "Wav Lease";
		} else if (beatType === "stems"){
			beatType = "Stems Lease"
		} else {
			beatType = beatType[0].toUpperCase() + beatType.substr(1);
		};
		
		code =
		`<div class="basket__item product">
			<div class="product__row df">
				<div class="product__column product__column_1 df">
					<div class="product__preview-block">
						<img class="product__preview" src="../audio/${catalog}/preview_min.jpg" alt="Preview">
					</div>
				</div>
				<div class="product__column product__column_2 df">
					<div class="product__content">
						<div class="product__title-row df">
							<h4 class="product__title">Beat:</h4>
							<button class="product__close" data-product="${productName}">
								<span class="icon-close"></span>
							</button>
						</div>
						<div class="product__name">${trackName}</div>
						<div class="product__bottom-row product__bottom-row_beat df">
							<div class="product__info-block">
								<div class="product__beat-type">${beatType}</div>
							</div>
							<div class="product__price">$${price}</div>
						</div>
					</div>
				</div>
			</div>
		</div>`;
	};

	return [code, price];
};

let scrollBool = true, scrollSpeed = 500;
function scrollTo(px, speed = "smooth"){
	let duration = speed === "fast" ? 20 : scrollSpeed;

	if (scrollBool){
		scrollBool = false;
		setTimeout(() => {
			scrollBool = true;
		}, duration);

		$([document.documentElement, document.body]).animate({
			scrollTop: px
		}, duration);
	};
};

function showIconCartInfo(){
	let counter = document.getElementById("cart-counter"), count = 0;

	for(let key in cart.services){
		if (cart.services[key].count){
			count++;
		};
	};

	for(let key in cart.beats){
		if (cart.beats[key].type){
			count++;
		};
	};

	for(let key in cart.bundles){
		if (cart.bundles[key].active){
			count++;
		};
	};

	if (count){
		counter.classList.add("header__cart-counter_visible");

		if (count > 9){
			counter.innerText = "9+";
		} else {
			counter.innerText = count + "";
		};
	} else {
		counter.classList.remove("header__cart-counter_visible");
	};
};

function showPriceOfProduct(productName){
	let priceElement = document.querySelector(`.product__price[data-product="${productName}"]`);

	if (priceElement){
		let price = cart.services[productName].count * cart.services[productName].price, totalPrice = price;

		priceElement.innerText = `$${price}0`;

		for (let key in cart.services){
			if (cart.services[key].count && key !== productName){
				totalPrice += cart.services[key].price * cart.services[key].count;
			};
		};

		for (let key in cart.beats){
			if (cart.beats[key].type){
				let type = cart.beats[key].type;
				
				totalPrice += cart.beats[key].prices[type];
			};
		};

		totalPrice = totalPrice.toFixed(0);
		document.querySelector(".basket__total-price").innerText = `$${totalPrice}`;
	};
};

let deleteProductName = null;

function showAllCartInfo(){
	let
		list = document.querySelector(".basket__list"),
		totalPrice = beatsDiscountPrice = beatsCount = servicesPrice = servicesCount = 0;
	
	list.innerHTML = "";

	for(let key in cart.services){
		if (cart.services[key].count){
			let infoArray = returnProductHTML("service", key);
			servicesCount += cart.services[key].count;

			list.innerHTML += infoArray[0];
			totalPrice += infoArray[1];
			servicesPrice += infoArray[1];
		};
	};

	beatsQueue.forEach(beatName => {
		if (cart.beats[beatName] && cart.beats[beatName].type){
			let infoArray = returnProductHTML("beat", beatName);
			beatsCount++;

			list.innerHTML += infoArray[0];
			totalPrice += +infoArray[1];
			
			if (beatsCount <= 3){
				beatsDiscountPrice += +infoArray[1]
			};
		};
	});

	for(let key in cart.bundles){
		if (cart.bundles[key].active){
			totalPrice += cart.bundles[key].totalPrice;
		};
	};

	console.log(beatsDiscountPrice);

	if (!totalPrice){
		document.querySelector(".basket__list-empty").classList.add("basket__list-empty_show");
		document.querySelector(".basket__content").classList.add("basket__content_empty");
	} else {
		document.querySelector(".basket__list-empty").classList.remove("basket__list-empty_show");
		document.querySelector(".basket__content").classList.remove("basket__content_empty");
	};

	const priceWithoutDiscount = Math.floor(totalPrice);

	if (beatsCount >= 3){
		let beatsDiscountPriceSave = beatsDiscountPrice;
		beatsDiscountPrice *= .9;
		totalPrice -= beatsDiscountPriceSave - beatsDiscountPrice;
	};

	showIconCartInfo();
	totalPrice = Math.floor(totalPrice);

	document.querySelector(".basket__total-price").innerHTML = `$${totalPrice}`;

	if (priceWithoutDiscount !== totalPrice){
		document.querySelector(`.basket__total-price_all`).innerHTML = `$${priceWithoutDiscount}`;
	} else {
		document.querySelector(`.basket__total-price_all`).innerHTML = ``;
	};

	$(".product__close").on("click", function(){
		let
			deleteProductName = $(this).attr("data-product"),
			subtitle = deleteProductName in cart.services ? "service" : "beat";

		showAlert({
			title: `Are u sure about deleting this ${subtitle}?`,
			text: "Unsaved changes will be discarded",
			type: "confirm",
			functions: {
				confirm: () => {
					setPrices();

					if (deleteProductName in cart.services){
						cart.services[deleteProductName].count = 0;
						cart.services[deleteProductName].info = null;
					} else if (deleteProductName in cart.beats){
						cart.beats[deleteProductName].type = null;
						beatsQueue.splice(beatsQueue.indexOf(deleteProductName), 1);
					};

					showPriceOfProduct(deleteProductName);
					showAllCartInfo(deleteProductName);
					deleteAlert();
					deleteProductName = null;
				},
				cancel: () => {deleteAlert();},
			},
		});
	});

	let deleteProductName;
	$(".product__btn_minus").on("click", function(){
		deleteProductName = $(this).attr("data-product");

		showAlert({
			title: "Are u sure about deleting this service?",
			text: "Unsaved changes will be discarded",
			type: "confirm",
			functions: {
				confirm: () => {
					setPrices();

					if (cart.services[deleteProductName].count > 1){

						let lastKeyOfObject = Object.keys(cart.services[deleteProductName].info);

						--cart.services[deleteProductName].count;
						delete cart.services[deleteProductName].info[lastKeyOfObject[lastKeyOfObject.length - 1]];

						document.querySelector(".product__count-box[data-product=\"" + deleteProductName + "\"]").textContent = cart.services[deleteProductName].count;

						showPriceOfProduct(deleteProductName);

						if (cart.services[deleteProductName].count != maxCountOfServices){
							document.querySelector(".product__btn_plus[data-product=\"" + deleteProductName + "\"]").classList.remove("product__btn_lock")
						};

					} else if (cart.services[deleteProductName].count === 1){
						--cart.services[deleteProductName].count;
						cart.services[deleteProductName].info = null;
					};

					deleteProductName = null;
					showIconCartInfo();
					showAllCartInfo();
					deleteAlert();
				},

				cancel: () => {deleteAlert();},
			},
		});
	});

	$(".product__btn_plus[data-popup]").on("click", function(){
		if ( $(this).hasClass("popup-lock") || $(this).hasClass("product__btn_lock") ){
			return;
		};
	
		let
			popupName = $(this).attr("data-popup"),
			popup = document.querySelector(`.popup[data-popup-name="${popupName}"]`);
		
		if (!popup) {
			return;
		};
	
		openPopup(popupName);
	});
};

window.onload = function(){
	deletePreloader();
	if ("to-section" in params && !("listen" in params)){
		scrollToSection("." + params["to-section"], "fast")
	};
	if ("listen" in params){
		scrollToTrack(params.listen);
	};
	if ("open-popup" in params){
		openPopup(params["open-popup"]);
	};

	// let script = document.createElement("script");
	// document.querySelector(".beforePlayer").insertAdjacentElement("afterend", script);
	// script.setAttribute("src", "https://www.paypal.com/sdk/js?client-id=ARStEJmfhHgNuzbpP8ihXdHrxZymHBBOXz6wBnY_6czL8m-A8ECmqM34EkHxVPDaT4VPV1vt-Yb7aD7H&currency=USD");
	// script.setAttribute("defer", "true");
};

document.querySelector("*").addEventListener("dragstart", function(e){
	e.preventDefault();
});

document.querySelector(".header__cart").addEventListener("click", function(){
	this.classList.toggle("header__cart_active");

	if (this.classList.contains("header__cart_active")){
		document.querySelector(".basket").classList.add("basket_show");

		document.body.classList.add("cart-lock");
	} else {
		document.querySelector(".basket").classList.remove("basket_show");

		document.body.classList.remove("cart-lock");
	};
});

// Edit size of cart panel
function cartResizeFunction(){
	let
		ww = window.innerWidth,
		wh = window.innerHeight;
	
	if (ww <= 540 || wh <= 595){
		document.querySelector(".basket").style.maxHeight = wh - document.querySelector(".header").offsetHeight + "px";

		document.querySelector(".basket").style.top = document.querySelector(".header").offsetHeight + "px";

		let
		basketHeight = document.querySelector(".basket").offsetHeight,
		bottomHeight = document.querySelector(".basket__bottom-block").offsetHeight;

		document.querySelector(".basket__list").style.maxHeight = +(basketHeight - bottomHeight).toFixed(0) - 50 + "px";
	} else {
		document.querySelector(".basket").removeAttribute("style");

		document.querySelector(".basket__list").removeAttribute("style");
	};
};

// Set margin for offers
function editOffersMargin(){
	let py = window.innerWidth;

	if (py < 425){
		document.querySelector(".offers").classList.add("offers_big-margin");
	} else {
		document.querySelector(".offers").classList.remove("offers_big-margin");
	};
};

// Set changes in mobile devices
function mobileChanges(){
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		document.querySelectorAll(".service").forEach(function(el){
			el.classList.add("popup-lock");
		});
	} else {
		document.querySelectorAll(".service").forEach(function(el){
			el.classList.remove("popup-lock");
		});
	}
};

// Dark filenames in filearea
function fileNameResize(attr){
	let parentStr = ``;

	if (attr && document.querySelector(`.filearea[data-popup-area="${attr}"]`)){
		parentStr = `.filearea[data-popup-area="${attr}"] `;
	};

	document.querySelectorAll(`${parentStr}.filearea__filename`).forEach(function(el){
		if (el.closest(".filearea__item").classList.contains("filearea__item_empty")){
			return;
		};

		let style = window.getComputedStyle(el);
		
		if (parseInt(style.getPropertyValue("max-width")) < el.clientWidth + 8){
			el.classList.add("filearea__filename_darked");
		} else {
			el.classList.remove("filearea__filename_darked");
		};
	});
};

cartResizeFunction();
editOffersMargin();
mobileChanges();

window.addEventListener("resize", function(){

	// Set margin for offers
	editOffersMargin();

	// Edit size of cart panel
	cartResizeFunction();

	// Edit background of bundles
	editBundlesImages();

	// Set changes on mobile OS
	mobileChanges();

	// Scroll of track title
	resizeTrackTitles();

	// Dark filenames in filearea
	fileNameResize();

	offers && offers.update();
});

window.addEventListener("scroll", function(){
	let py = window.pageYOffset;

	if (py + window.innerHeight > $(`.copyright`).offset().top){
		$(".player").addClass("player_hide");
		$(".player__down-block").addClass("player__down-block_hide");
		$(".player__down-block").addClass("player__down-block_lock");
		$(".player__down-block").removeClass("player__down-block_opened");
	} else {
		$(".player__down-block").removeClass("player__down-block_hide");
		$(".player__down-block").removeClass("player__down-block_lock");
	};
});

let showedTrack;
function setBeatInfoToPopup(trackName){
	setPrices();

	let
		catalog = reverseNameFormat(trackName, "key", "catalog"),
		title = reverseNameFormat(trackName, "key", "title"),
		obj = trackList[cart.beats[trackName].trackListIndex],
		timing = obj.timing,
		typeBeat = obj.typeBeat,
		musicalCharacteristic = obj.musicalCharacteristic;
	
	typeBeat = typeBeat.substr(typeBeat.indexOf("_") + 1, typeBeat.lastIndexOf("_") - 1);
	musicalCharacteristic = musicalCharacteristic.split("|");

	musicalCharacteristic[1] = replaceAllLetters(musicalCharacteristic[1], "#", '<span class="icon-sharp"></span>');
	
	showedTrack = catalog;
	
	$(".popup__beat-preview-blur").css("background-image", `url('../audio/${catalog}/preview_min.jpg')`)
	$(".popup__preview").attr("src", `../audio/${catalog}/preview_min.jpg`)
	$(".popup__track-name").text(title);
	$(".popup__type-beat-author").text(typeBeat);

	$(".popup__characteristic_timing").text(timing);
	$(".popup__characteristic_bpm").text(musicalCharacteristic[0]);
	$(".popup__characteristic_key").html(musicalCharacteristic[1]);

	$(".popup-beat").attr("data-beat", catalog);

	document.querySelectorAll(`.beat-type__add`).forEach(function(btn){
		let price = "$" + cart.beats[trackName].prices[btn.getAttribute("data-beat-type")] + "0";
		btn.innerHTML = `<span class="icon-cart"></span>${price}`;
	});
};

let beatsQueue = [];

$(".beat-type__add").on("click", function(){
	if (!showedTrack){
		showAlert(alertSet.error);
		return;
	};

	let
		catalog = showedTrack,
		key = reverseNameFormat(catalog, "catalog", "key"),
		type = this.getAttribute("data-beat-type");

	if (!type){
		showAlert(alertSet.error);
		return;
	};

	beatsQueue.push(key);
	cart.beats[key].type = type;

	showAllCartInfo();
	showIconCartInfo();
	closePopup();
});

$(".audio__add").on("click", function(){
	let key = this.getAttribute("data-product");

	openPopup(key);
});

let changePopupBool = true, openPopupTimeout;
function openPopup(name){
	let catalog = name;

	if (name.indexOf("-") !== -1){
		name = reverseNameFormat(name, "catalog", "key");
	} else {
		catalog = reverseNameFormat(name, "key", "catalog");
	};

	if (!document.querySelector(`.popup-service[data-popup-name="${name}"]`) && document.querySelector(`.musitem[data-listen="${catalog}"]`)){
		if (document.querySelector(".popup.popup_active") && changePopupBool){
			if ($(".popup.popup_active").attr("data-popup-name") === name){
				return;
			};
	
			closePopup(false);
			changePopupBool = false;


			clearTimeout(openPopupTimeout);
			openPopupTimeout = setTimeout(() => {
				setBeatInfoToPopup(name);
				$(`.popup-beat`).addClass("popup_active");
				changePopupBool = true;
			}, 350);
		} else {
			setBeatInfoToPopup(name);
			document.body.classList.add("lock_important");
			$(`.popup-beat`).addClass("popup_active");
		};
	} else if(document.querySelector(`.popup-service[data-popup-name="${name}"]`)){
		if (document.querySelector(".popup.popup_active") && changePopupBool){
			if ($(".popup.popup_active").attr("data-popup-name") === name){
				return;
			};
	
			closePopup(false);
			changePopupBool = false;
	
			clearTimeout(openPopupTimeout);
			openPopupTimeout = setTimeout(() => {
				$(`.popup[data-popup-name="${name}"]`).addClass("popup_active");
				changePopupBool = true;
			}, 350);
		} else {
			document.body.classList.add("lock_important");
			$(`.popup[data-popup-name="${name}"]`).addClass("popup_active");
		};
	};
};

let closeTimeout;
function closePopup(closeAll = true){
	let activePopup = document.querySelector(".popup.popup_active");

	if ( !activePopup ){
		return;
	};

	$(activePopup).fadeOut(150);
	clearTimeout(closeTimeout);
	closeTimeout = setTimeout(() => {
		activePopup.classList.remove("popup_active");
		$(activePopup).fadeIn(0);
		if (closeAll){
			document.body.classList.remove("lock_important");
		};
	}, 150);
};

function returnFileObject(file, maxSize = 9999){
	if (!file){
		return null;
	};

	let
		fileName = fileFormat = file.name,
		fileSize = +(file.size / 2 ** 20).toFixed(4);
	
	if (fileSize > maxSize){
		alert("Max file size - " + maxSize);
		return null;
	};
	
	fileName = fileName.substr(0, fileName.lastIndexOf("."));
	fileFormat = fileFormat.substr(fileFormat.lastIndexOf("."));

	return {
		fileName,
		fileFormat,
		fileSize,
	};
};

$("[data-popup]").on("click", function(){
	if ( $(this).hasClass("popup-lock") ){
		return;
	};

	let
		popupName = $(this).attr("data-popup"),
		popup = document.querySelector(`.popup[data-popup-name="${popupName}"]`);
	
	if (!popup) {
		return;
	};

	openPopup(popupName);
});

$(".popup__close").on("click", function(){
	closePopup();
});

$(".popup__body").on("click", function(e){
	if (e.target === this){
		closePopup();
	};
});

$(".popup__input_text[type=\"email\"]").on("input", function(){
	$(".popup__input_text[type=\"email\"]").val(this.value);

	let popupName = this.closest(".popup").getAttribute("data-popup-name");

	if (!popupName){
		return;
	};

	if (popupInputsCheck(popupName)){
		document.querySelector(`.popup[data-popup-name="${popupName}"] .popup__post`).classList.remove("popup__post_lock");
	} else {
		document.querySelector(`.popup[data-popup-name="${popupName}"] .popup__post`).classList.add("popup__post_lock");
	};
});

$(".popup__input_text").on("focus", function(){
	let placeholder = $(this).siblings(".popup__input-placeholder");

	placeholder.addClass("popup__input-placeholder_hided");
});

$(".popup__input_text").on("blur", function(){
	let placeholder = $(this).siblings(".popup__input-placeholder");

	if (!this.value){
		placeholder.removeClass("popup__input-placeholder_hided");
	};
});

$(".popup__input-select-body").fadeOut(0);

$(".popup__input-option-current").on("click", function(){
	let select = $(this).parent();

	select.toggleClass("popup__input-select_open");
	
	if (select.hasClass("popup__input-select_open")){
		$(".popup__input-select-body").fadeIn(150);
	} else {
		$(".popup__input-select-body").fadeOut(150);
	};
});

$(".popup__input-option").on("click", function(){
	let
		current = $(this).parent().siblings(".popup__input-option-current"),
		value = $(this).text();
	
	$(this).siblings(".popup__input-option_current").removeClass("popup__input-option_current");

	$(this).addClass("popup__input-option_current");

	current.text(value);

	current.parent().removeClass("popup__input-select_open");
	$(this).parent().fadeOut(150);
});

let
	fileareaLength = document.querySelectorAll(".filearea").length,
	fileareaCounters = new Array(fileareaLength + 1).join('0').split('').map(parseFloat),

	audioTypes = ["audio/mpeg", "audio/wav", "audio/x-m4a"],
	fileareaFiles = {}, maxSize = 30;

let alertSet = {
	maxFileSize: {
		title: "File’s size is too large",
		text: "You can’t upload files that are more than 30Mb size",
		type: "alert"
	},
	audioFormats: {
		title: "File format is invalid",
		text: "Formats that are acceptable : Mp3, Wav, M4a",
		type: "alert"
	},
	error: {
		title: "Technical problem",
		text: "Something went wrong, please try again later",
		type: "alert"
	},
};

for (let i = 0; i < fileareaLength; i++){
	let
		filearea = document.querySelectorAll(`.filearea`)[i],
		attr = filearea.getAttribute("data-popup-area");

	fileareaFiles[attr] = [];

	document.querySelectorAll(`.filearea[data-popup-area="${attr}"] .filearea__item`).forEach(function(item, index){
		item.setAttribute("data-file", index);

		document.querySelector(`.filearea[data-popup-area="${attr}"] .filearea__item_${index + 1} .filearea__btn-change`).setAttribute("data-file", index);
		document.querySelector(`.filearea[data-popup-area="${attr}"] .filearea__item_${index + 1} .filearea__btn-close`).setAttribute("data-file", index);
	});
};

let alertTimeout, alertDeleteTimeout, alertDeleteDelay = 15000;
function deleteAlert(obj){
	let alert = $(".alert");

	alert.removeClass("alert_show");

	clearTimeout(alertTimeout);
	alertTimeout = setTimeout(() => {
		if (obj) {
			$(".alert__title").text(obj.title);
			$(".alert__text").text(obj.text);
			alert.addClass("alert_show");

			clearTimeout(alertDeleteTimeout);
			alertDeleteTimeout = setTimeout(() => {
				document.querySelector(`.alert__confirm-btn`).onclick = null;
				document.querySelector(`.alert__cancel-btn`).onclick = null;
				deleteAlert();
			}, alertDeleteDelay);
		} else {
			document.querySelector(`.alert__confirm-btn`).onclick = null;
			document.querySelector(`.alert__cancel-btn`).onclick = null;
			alert.addClass("alert_delete");

			$(".alert__title").html("");
			$(".alert__text").html("");
		};
	}, 150);
};

function showAlert(obj = alertSet.error){
	let
		title = obj.title,
		text = obj.text,
		type = obj.type;
	
	if ($(".alert__title").html() === title && $(".alert__text").html() === text){
		return;
	};
	
	
	if (!type){
		type = "alert";
	};

	/*
		Type is: alert, confirm
	*/

	if (type === "alert"){
		$(".alert").removeClass("alert_confirm");
	} else if (type === "confirm"){
		$(".alert").addClass("alert_confirm");

		if ("functions" in obj){
			document.querySelector(`.alert__confirm-btn`).onclick = obj.functions.confirm;
			document.querySelector(`.alert__cancel-btn`).onclick = obj.functions.cancel;
		};
	};
	
	if ($(".alert").hasClass("alert_delete")){
		$(".alert__title").html(title);
		$(".alert__text").html(text);

		$(".alert").removeClass("alert_delete");
		clearTimeout(alertTimeout);
		alertTimeout = setTimeout(() => {
			$(".alert").addClass("alert_show");

			clearTimeout(alertDeleteTimeout);
			alertDeleteTimeout = setTimeout(() => {
				deleteAlert();
			}, alertDeleteDelay);
		}, 150);
	} else {
		deleteAlert(obj);
	};
};

let hoverTimeout;
$(".alert").on("mouseenter", function(){
	$(".alert__background").addClass("alert__background_transition");

	clearTimeout(hoverTimeout);
	hoverTimeout = setTimeout(() => {
		$(".alert__background").removeClass("alert__background_transition");
	}, as);
});

$(".alert").on("mousemove", function(e){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		return;
	};

	let
		coords = this.getBoundingClientRect(),
		top = +(e.clientY - coords.top).toFixed(2),
		left = +(e.clientX - coords.left).toFixed(2);

	top = top < 0 ? 0 : top;
	left = left < 0 ? 0 : left;

	top = +(top / 8).toFixed(2);
	left = +(left / 7).toFixed(2);

	let filterDeg = +((top + left ) / 10).toFixed(1);

	$(this).children(".alert__background").css({
		"background-position": `${left}% ${top}%`,
		"filter": `hue-rotate(${filterDeg}deg)`
	});
});

$(".alert__close").on("click", function(){
	deleteAlert();
});

function showFileInfo(attr, fileIndex, file){
	let
		fileName = file.name.substr(0, file.name.lastIndexOf(".")),
		fileFormat = file.name.substr(file.name.lastIndexOf(".")),
		el = $(`.filearea[data-popup-area="${attr}"] .filearea__item_${fileIndex + 1}`),
		filenameItem = el.find(".filearea__filename-block");

	filenameItem.html(
		`<span class="filearea__filename">${fileName}</span><span class="filearea__fileformat">${fileFormat}</span>`
	);

	let
		name = document.querySelector(`.filearea[data-popup-area="${attr}"] .filearea__item_${fileIndex + 1} .filearea__filename`),
		style = window.getComputedStyle(name);
	
	setTimeout(() => {
		if (parseInt(style.getPropertyValue("max-width")) < name.clientWidth + 8){
			name.classList.add("filearea__filename_darked");
		} else {
			name.classList.remove("filearea__filename_darked");
		};
	}, 50);
	
	el.removeClass("filearea__item_empty");
};

function adaptiveFileareaUX(attr){
	let
		emptyItemsSet = document.querySelectorAll(`.filearea[data-popup-area="${attr}"] .filearea__item_empty`),
		panelBtn = document.querySelector(`.filearea[data-popup-area="${attr}"] .filearea__panel-btn`);

	if (!emptyItemsSet.length){
		panelBtn.classList.add("filearea__panel-btn_lock");
	} else {
		panelBtn.classList.remove("filearea__panel-btn_lock");
	};
};

function deleteFileFromFilearea(attr, fileIndex){
	let popupName = document.querySelector(`.filearea[data-popup-area="${attr}"]`).closest(".popup").getAttribute("data-popup-name");

	if (fileIndex >= 0 && fileareaFiles[attr][fileIndex]){
		fileareaFiles[attr].splice(fileIndex, 1);
		$(`.filearea[data-popup-area="${attr}"] .filearea__item`).addClass("filearea__item_empty");
	};

	if (popupName && popupInputsCheck(popupName)){
		document.querySelector(`.popup[data-popup-name="${popupName}"] .popup__post`).classList.remove("popup__post_lock");
	} else {
		document.querySelector(`.popup[data-popup-name="${popupName}"] .popup__post`).classList.add("popup__post_lock");
	};

	if (!fileareaFiles[attr].length){
		document.querySelector(`.filearea[data-popup-area="${attr}"]`).classList.add("filearea_empty");
		return;
	};

	fileareaFiles[attr].forEach(function(file, index){
		document.querySelector(`.filearea[data-popup-area="${attr}"] .filearea__item_${index + 1}`).classList.remove("filearea__item_empty");
		showFileInfo(attr, index, file);
	});
};

$(".filearea").on("dragenter", function(e){
	e.preventDefault();
	e.stopPropagation();

	let
		filareaIndex = $(".filearea").index(this),
		attr = $(this).attr("data-popup-area"),
		emptySet = document.querySelectorAll(`.filearea[data-popup-area="${attr}"] .filearea__item_empty`);
	
	fileareaCounters[filareaIndex]++;
	
	if (emptySet.length){
		$(this).addClass("filearea_hovered");
	} else {
		showAlert({
			title: "Reached the file limit",
			text: `You can’t upload any more files<br>Maximum amount of files : ${document.querySelectorAll(`.filearea[data-popup-area="${attr}"] .filearea__item`).length}`
		});
	};
});

$(".filearea").on("dragleave", function(e){
	e.preventDefault();
	e.stopPropagation();

	let filareaIndex = $(".filearea").index(this);

	if (!(--fileareaCounters[filareaIndex])){
		$(this).removeClass("filearea_hovered");
	};
});

$(".filearea").on("dragover", (e) => {e.preventDefault()});

$(".filearea").on("drop", function(e){
	e.preventDefault();
	$(this).removeClass("filearea_hovered");

	let
		filearea = this,
		files = e.originalEvent.dataTransfer.files,
		attr = this.getAttribute("data-popup-area"),
		fileareaEmptyItems = document.querySelectorAll(`.filearea[data-popup-area="${attr}"] .filearea__item_empty`);

	if (!fileareaEmptyItems.length){
		showAlert({
			title: "Reached the file limit",
			text: `You can’t upload any more files<br>Maximum amount of files : ${document.querySelectorAll(`.filearea[data-popup-area="${attr}"] .filearea__item`).length}`
		});
		return;
	};

	let indexPlus = 0;

	fileareaEmptyItems.forEach(function(el, index){
		let file = files[index + indexPlus];

		if (!file){
			return;
		};

		let size = +(file.size / 2 ** 20).toFixed(4);

		while (!audioTypes.includes(file.type) || size > maxSize){
			indexPlus++;
			file = files[index + indexPlus];

			if (!file){
				showAlert({
					title: "Some files can’t be uploaded",
					text: "Size of the files you try to upload is too big or the format is invalid."
				});
				return;
			};

			size = +(file.size / 2 ** 20).toFixed(4);
		};

		if (filearea.classList.contains("filearea_empty")){
			filearea.classList.remove("filearea_empty");
		};

		fileareaFiles[attr].push(file);
		
		let
			fileName = file.name.substr(0, file.name.lastIndexOf(".")),
			fileFormat = file.name.substr(file.name.lastIndexOf(".")),
			filenameItem = $(el).find(".filearea__filename-block");

		filenameItem.html(
			`<span class="filearea__filename">${fileName}</span><span class="filearea__fileformat">${fileFormat}</span>`
		);
		
		el.classList.remove("filearea__item_empty");
	});

	adaptiveFileareaUX(attr);
	fileNameResize(attr);

	let popupName = this.closest(".popup").getAttribute("data-popup-name");

	if (!popupName){
		return;
	};

	if (popupName && popupInputsCheck(popupName)){
		document.querySelector(`.popup[data-popup-name="${popupName}"] .popup__post`).classList.remove("popup__post_lock");
	} else {
		document.querySelector(`.popup[data-popup-name="${popupName}"] .popup__post`).classList.add("popup__post_lock");
	};
});

let lastChangeFileNumber = 0;
$(".filearea__btn-change").on("click", function(){
	let
		attr = this.closest(".filearea").getAttribute("data-popup-area"),
		input = document.querySelector(`.popup__input_file[data-popup-file="${attr}"]`),
		index = +$(this).attr("data-file");

	lastChangeFileNumber = index;

	input.click();
});

$(".filearea__btn-close").on("click", function(e){
	e.originalEvent.stopPropagation();

	let
		attr = this.closest(".filearea").getAttribute("data-popup-area"),
		index = +this.getAttribute("data-file");
	
	deleteFileFromFilearea(attr, index);
	adaptiveFileareaUX(attr);
});

$(".filearea").on("click", function(){
	if (!this.classList.contains("filearea_empty")){
		return;
	};

	let
		attr = this.getAttribute("data-popup-area"),
		input = document.querySelector(`.popup__input_file[data-popup-file="${attr}"]`);

	lastChangeFileNumber = 0;
	input.click();
});

$(".filearea__panel-btn").on("click", function(){
	let
		attr = this.getAttribute("data-popup-setfile"),
		input = document.querySelector(`.popup__input_file[data-popup-file="${attr}"]`),
		emptyItem = document.querySelector(`.filearea[data-popup-area="${attr}"] .filearea__item_empty`);
	
	if (!emptyItem){
		showAlert({
			title: "Reached the file limit",
			text: `You can’t upload any more files<br>Maximum amount of files : ${document.querySelectorAll(`.filearea[data-popup-area="${attr}"] .filearea__item`).length}`
		});
		return;
	};

	index = +emptyItem.getAttribute("data-file");
	if (!index){
		showAlert({
			title: "File can’t be uploaded",
			text: "Something went wrong, please try again later"
		});
		return;
	};
	lastChangeFileNumber = index;

	input.click();
});

function popupInputsCheck(popupName){
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	for (let i = 0; i < document.querySelectorAll(`.popup[data-popup-name="${popupName}"] .popup__input_text`).length; i++){
		let input = document.querySelectorAll(`.popup[data-popup-name="${popupName}"] .popup__input_text`)[i];

		if (!input.value || !re.test(String(input.value).toLowerCase())){
			return false;
		};
	};

	for (let i = 0; i < document.querySelectorAll(`.popup[data-popup-name="${popupName}"] .filearea`).length; i++){
		let
			filearea = document.querySelectorAll(`.popup[data-popup-name="${popupName}"] .filearea`)[i],
			attr = filearea.getAttribute("data-popup-area"),
			notRequiredFiles = 0;
	
		document.querySelectorAll(`.filearea[data-popup-area="${attr}"] .filearea__item`).forEach(function(item){
			if (!item.classList.contains("filearea__item_notrequired")){
				notRequiredFiles++;
			};
		});

		if (notRequiredFiles <= fileareaFiles[attr].length){
			for (let j = 0; j < fileareaFiles[attr].length; j++){
				let
					file = fileareaFiles[attr][j],
					size = +(file.size / 2 ** 20).toFixed(4);
				
				if (!audioTypes.includes(file.type) || size > maxSize){
					return false;
				};
			};
		} else {
			return false;
		};
	};

	for (let i = 0; i < document.querySelectorAll(`.popup[data-popup-name="${popupName}"] .popup__textarea`).length; i++){
		let
			textarea = document.querySelectorAll(`.popup[data-popup-name="${popupName}"] .popup__textarea`)[i],
			length = +String(textarea.value).replace(/^\s+|\s+$/g, '').length;
		
		if (length < minTextareaLength || length > maxTextareaLength){
			return false;
		};
	};

	return true;
};

function returnPopupInputInfo(popupName){
	let
		obj = {},
		fileareas = document.querySelectorAll(`.popup[data-popup-name="${popupName}"] .filearea`),
		selects = document.querySelectorAll(`.popup[data-popup-name="${popupName}"] .popup__input-option-current`);

	if (fileareas.length){
		obj.files = {};
	};

	for (let i = 0; i < fileareas.length; i++){
		let
			filearea = fileareas[i],
			attr = filearea.getAttribute("data-popup-area");
		
		obj.files["filearea_" + (i + 1)] = Object.assign({}, fileareaFiles[attr]);
	};

	for (let i = 0; i < document.querySelectorAll(`.popup[data-popup-name="${popupName}"] .popup__input_text`).length; i++){
		let input = document.querySelectorAll(`.popup[data-popup-name="${popupName}"] .popup__input_text`)[i];

		if (input.getAttribute("type") === "email"){
			obj.email = input.value;
		} else {
			obj.inputText = input.value;
		};
	};

	for (let i = 0; i < document.querySelectorAll(`.popup[data-popup-name="${popupName}"] .popup__textarea`).length; i++){
		let textarea = document.querySelectorAll(`.popup[data-popup-name="${popupName}"] .popup__textarea`)[i];
		
		obj.textarea = String(textarea.value).replace(/^\s+|\s+$/g, '');
	};

	if (selects.length){
		obj.selects = {};
	};

	for (let i = 0; i < selects.length; i++){
		obj.selects["select_" + (i + 1)] = selects[i].textContent;
	};

	return obj;
};

$(".popup__input_file").on("change", function(){
	let
		attr = this.getAttribute("data-popup-file"),
		files = Object.assign({}, this.files),
		saveLastChangeFileNumber = lastChangeFileNumber;
	
	lastChangeFileNumber = 0;
	this.value = null;
	
	if (!files[0]){
		showAlert({
			title: "File can’t be uploaded",
			text: "Something went wrong, please try again later"
		});
		return;
	};

	let
		file = files[0],
		size = +(file.size / 2 ** 20).toFixed(4);
	
	if (!audioTypes.includes(file.type)){
		showAlert(alertSet.audioFormats);
		return;
	};

	if (typeof saveLastChangeFileNumber !== "number" || saveLastChangeFileNumber < 0 || !size){
		showAlert({
			title: "File can’t be uploaded",
			text: "Something went wrong, please try again later"
		});
		return;
	};

	if (size > maxSize){
		showAlert(alertSet.maxFileSize);
		return;
	};

	fileareaFiles[attr][saveLastChangeFileNumber] = file;
	showFileInfo(attr, saveLastChangeFileNumber, file);
	adaptiveFileareaUX(attr);
	document.querySelector(`.filearea[data-popup-area="${attr}"]`).classList.remove("filearea_empty");

	let popupName = this.closest(".popup").getAttribute("data-popup-name");

	if (!popupName){
		return;
	};

	if (popupInputsCheck(popupName)){
		document.querySelector(`.popup[data-popup-name="${popupName}"] .popup__post`).classList.remove("popup__post_lock");
	} else {
		document.querySelector(`.popup[data-popup-name="${popupName}"] .popup__post`).classList.add("popup__post_lock");
	};
});

let
	counterScaleTimeout,
	minTextareaLength = 30, maxTextareaLength = 1500;

$(".popup__textarea-counter").text(`0/${maxTextareaLength}`);

$(".popup__textarea").on("input", function(e){
	let
		counter = $(this).siblings(".popup__textarea-counter"),
		length = this.value.length;

	if (length > maxTextareaLength && e.key !== "Backspace"){
		this.value = this.value.substr(0, this.value.length - 1);
		length = this.value.length;

		counter.addClass("popup__textarea-counter_scaled");
		clearTimeout(counterScaleTimeout);
		counterScaleTimeout = setTimeout(() => {
			counter.removeClass("popup__textarea-counter_scaled");
		}, as);
	};

	counter.text(`${length}/${maxTextareaLength}`);

	let popupName = this.closest(".popup").getAttribute("data-popup-name");

	if (!popupName){
		return;
	};

	if (popupInputsCheck(popupName)){
		document.querySelector(`.popup[data-popup-name="${popupName}"] .popup__post`).classList.remove("popup__post_lock");
	} else {
		document.querySelector(`.popup[data-popup-name="${popupName}"] .popup__post`).classList.add("popup__post_lock");
	};
});

$(".popup__textarea").on("paste", function(e){
	let
		clipboardData = e.originalEvent.clipboardData || window.clipboardData,
		pasteData = clipboardData.getData('Text'),
		counter = $(this).siblings(".popup__textarea-counter");

	if (this.value.length + pasteData.length > maxTextareaLength){
		e.preventDefault();

		counter.addClass("popup__textarea-counter_scaled");
		clearTimeout(counterScaleTimeout);
		counterScaleTimeout = setTimeout(() => {
			counter.removeClass("popup__textarea-counter_scaled");
		}, as);
	};

	let popupName = this.closest(".popup").getAttribute("data-popup-name");

	if (!popupName){
		return;
	};

	if (popupInputsCheck(popupName)){
		document.querySelector(`.popup[data-popup-name="${popupName}"] .popup__post`).classList.remove("popup__post_lock");
	} else {
		document.querySelector(`.popup[data-popup-name="${popupName}"] .popup__post`).classList.add("popup__post_lock");
	};
});

$(".popup__post").on("click", function(){
	let
		popupName = this.closest(".popup").getAttribute("data-popup-name"),
		productName = this.getAttribute("data-product"),
		popupCheck = popupInputsCheck(popupName);
	
	if (this.classList.contains("popup__post_lock") || !popupName || !popupCheck){
		return;
	};

	setPrices();
	
	if (cart.services[productName].count){
		if (cart.services[productName].count > maxCountOfServices){
			cart.services[productName].count = maxCountOfServices - 1;
		} else if (cart.services[productName].count === maxCountOfServices){
			showAlert({
				title: "Amount limit has reached",
				text: "You are trying to reach the limit of this type of service (Max is " + maxCountOfServices + ")"
			});
			return;
		};
	};

	let objInfo = returnPopupInputInfo(popupName);

	cart.services[productName].count++;

	if (cart.services[productName].info === null){
		cart.services[productName].info = {};
	};
	cart.services[productName].info[`service_${cart.services[productName].count}`] = objInfo;
	
	document.querySelectorAll(`.popup[data-popup-name="${popupName}"] .filearea`).forEach(function(filearea){
		let attr = filearea.getAttribute("data-popup-area");

		for (let i = 0; i < document.querySelectorAll(`.filearea[data-popup-area="${attr}"] .filearea__item`).length; i++){
			deleteFileFromFilearea(attr, 0);
		};

		adaptiveFileareaUX(attr);
	});

	let
		textarea = $(`.popup[data-popup-name="${popupName}"] .popup__textarea`),
		counter = textarea.siblings(".popup__textarea-counter");

	textarea.val("");
	counter.text(`0/${maxTextareaLength}`);
	if (document.querySelector(`.popup[data-popup-name="${popupName}"] .filearea__btn-close`) || document.querySelector(`.popup[data-popup-name="${popupName}"] .filearea__textarea`)){
		document.querySelector(`.popup[data-popup-name="${popupName}"] .popup__post`).classList.add("popup__post_lock");
	};

	showAllCartInfo();
	showIconCartInfo();
	closePopup();
});

for (let i = 0; i < 3; i++){
	let
		obj = trackList[i],
		catalog = reverseNameFormat(obj.trackName, "title", "catalog"),
		typeBeat = obj.typeBeat;

	typeBeat = typeBeat.substr(typeBeat.indexOf("_") + 1, typeBeat.lastIndexOf("_") - 1);

	document.querySelector(`.footer__lastest-beats`).innerHTML +=
	`<div class="footer__lastest-beat lastest-beat unselect" data-tracklink="${catalog}">
		<div class="lastest-beat__row df">
			<div class="lastest-beat__column df">
				<div class="lastest-beat__preview-block">
					<img src="../audio/${catalog}/preview_min.jpg" alt="Prev">
				</div>
			</div>
			<div class="lastest-beat__column df">
				<div class="lastest-beat__info-block">
					<div class="lastest-beat__trackname">${obj.trackName}</div>
					<div class="lastest-beat__type-beat">
						<span class="lastest-beat__type-beat-author">${typeBeat}</span> Type Beat
					</div>
				</div>
			</div>
		</div>
	</div>`;
};

$(".lastest-beat[data-tracklink]").on("click", function(){
	let trackName = this.getAttribute("data-tracklink");

	scrollToTrack(trackName);
});

$(".lastest-beat[data-tracklink]").on("mousedown pointerdown", function(){
	if (!scrollingToTrack){
		this.classList.add("lastest-beat_pressed");
	};
});

$(".lastest-beat[data-tracklink]").on("mouseout mouseup pointerup pointerout", function(){
	if (!scrollingToTrack){
		this.classList.remove("lastest-beat_pressed");
	};
});

if (email){
	$(".popup__input-placeholder").addClass("popup__input-placeholder_hided");
	$(".popup__input_text[type=\"email\"]").val(email);
};

let sliderSpeed = 700;

offers = new Swiper(".offers__slider", {
	pagination: {
		el: ".offers__pagination",
		clickable: true,
		dynamicBullets: true,
	},

	keyboard: {
		enabled: true,
		onlyInViewport: true
	},

	preloadImages: true,
	lazy: {
		loadOnTransitionStart: true,
		loadPrevNext: true
	},

	// autoplay: {
	// 	delay: 7000,
	// 	stopOnLastSlide: false,
	// 	disableOnInteraction: true
	// },

	touchRatio: 1,
	touchAngle: 35,
	grabCursor: false,
	speed: sliderSpeed,
	watchOverflow: true,
	autoHeight: false,
	loop: false,
	slidesPerView: 1,
	centeredSlides: true,
	spaceBetween: 35,
});

// Edit background of bundles
function editBundlesImages(){
	let
		ww = window.innerWidth,
		subName = ww < 540 ? "-mobile" : "";

	document.querySelectorAll(".offers__bundle").forEach(function(img, index){
		if (img.getAttribute("data-src")){
			img.setAttribute("data-src", `../images/store/bundle-content/bundle_${index + 1}${subName}.jpg`);
		} else {
			img.setAttribute("src", `../images/store/bundle-content/bundle_${index + 1}${subName}.jpg`);
		}
	});
};


window.onunload = () => {
	

	localStorage.setItem("email", document.querySelector(".popup__input_text[type=\"email\"]").value);
};

window.addEventListener("beforeunload", function(e){
	if (document.querySelector(`.header__cart-counter`).classList.contains("header__cart-counter_visible")){
		e.preventDefault();
		return e.returnValue = "Are you sure to leave the website? All the changes will be lost";
	};
});

document.querySelector(".offers__slider").addEventListener("mouseover", function(){
	offers.autoplay.stop();
});

document.querySelector(".offers__slider").addEventListener("mouseleave", function(){
	offers.autoplay.start();
});