const
	isStore = !!document.getElementById("cart-counter"),
	wavBeatPrice = 29.90,
	stemsBeatPrice = 99.90,
	exclusiveBeatPrice = 299.90,
	artworkPrice = 25,
	visualPrice = 35,
	mixingAndMasteringPrice = 40,
	orderPrice = 100,
	clip1 = '<iframe width="560" height="315" src="https://www.youtube.com/embed/0BoUBiEiYL8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
	clip2 = '<iframe width="560" height="315" src="https://www.youtube.com/embed/yK-4kDrO8i4" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

if (!isStore && document.querySelector(`.price__price`)){
	document.querySelector(`.price__price[data-product="artwork"]`).innerHTML = `<sup>$</sup>${artworkPrice}`;
	document.querySelector(`.price__price[data-product="mixingAndMastering"]`).innerHTML = `<sup>$</sup>${mixingAndMasteringPrice}`;
	document.querySelector(`.price__price[data-product="visuals"]`).innerHTML = `<sup>$</sup>${visualPrice}`;
	document.querySelector(`.price__price[data-product="order"]`).innerHTML = `<sup>$</sup>${orderPrice}`;
	document.querySelector(`.price__price[data-product="beats"]`).innerHTML = `<sup>$</sup>${Math.ceil(wavBeatPrice)}-${Math.ceil(exclusiveBeatPrice)}`;
} else if (isStore){
	document.querySelector(`.popup[data-popup-name="artwork"] .popup__end-total`).innerText = `$${artworkPrice}`;
	document.querySelector(`.popup[data-popup-name="visuals"] .popup__end-total`).innerText = `$${visualPrice}`;
	document.querySelector(`.popup[data-popup-name="mixingAndMastering"] .popup__end-total`).innerText = `$${mixingAndMasteringPrice}`;
	document.querySelector(`.popup[data-popup-name="order"] .popup__end-total`).innerText = `$${orderPrice}`;
};