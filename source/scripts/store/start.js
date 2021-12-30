let
	maxCountOfServices = 5,
	trackList, keys = ["ArrowRight", "ArrowLeft", "Backspace"],
	email = localStorage.getItem("email");
	as = 280;

trackList = [
	{
		trackName: "Destiny",
		typeBeat: "_Landon Cube_ Type Beat",
		musicalCharacteristic: "145|Cm",
		timing: "2:24",
	},
	{
		trackName: "Detroit Life",
		typeBeat: "_Ryo Da Young_ Type Beat",
		musicalCharacteristic: "200|Em",
		timing: "2:35",
	},
	{
		trackName: "Life Strings",
		typeBeat: "_Baby Keem_ Type Beat",
		musicalCharacteristic: "150|Em",
		timing: "2:22",
	},
	{
		trackName: "Suicidal Thoughts",
		typeBeat: "_Comethazine_ Type Beat",
		musicalCharacteristic: "140|Em",
		timing: "2:05",
	},
	{
		trackName: "Extendo Clip",
		typeBeat: "_Lil Loaded_ Type Beat",
		musicalCharacteristic: "125|Cm",
		timing: "2:04",
	},
	{
		trackName: "Mental Suffering",
		typeBeat: "_Lil Gnar_ Type Beat",
		musicalCharacteristic: "150|Fm",
		timing: "3:02",
	},
	{
		trackName: "Fleeting Motions",
		typeBeat: "_Polo G_ Type Beat",
		musicalCharacteristic: "200|Gm",
		timing: "1:54",
	},
	{
		trackName: "Lifetime",
		typeBeat: "_Lil Skies_ Type Beat",
		musicalCharacteristic: "180|Em",
		timing: "1:57",
	},
	{
		trackName: "Ice Dancin",
		typeBeat: "_Lil Baby_ Type Beat",
		musicalCharacteristic: "130|Fm",
		timing: "2:13",
	},
	{
		trackName: "Midnight Sigh",
		typeBeat: "_Lil Skies_ Type Beat",
		musicalCharacteristic: "145|Gm",
		timing: "2:29",
	},
	{
		trackName: "Property",
		typeBeat: "_Lil Baby_ Type Beat",
		musicalCharacteristic: "154|Cm",
		timing: "2:00",
	},
	{
		trackName: "Mind Vibes",
		typeBeat: "_Landon Cube_ Type Beat",
		musicalCharacteristic: "145|Em",
		timing: "2:27",
	},
	{
		trackName: "Cashing Out",
		typeBeat: "_Lil Mosey_ Type Beat",
		musicalCharacteristic: "102|Gm",
		timing: "3:10",
	},
	{
		trackName: "Sunset",
		typeBeat: "_StaySolidRocky_ Type Beat",
		musicalCharacteristic: "145|Em",
		timing: "1:46",
	},
	{
		trackName: "Smoke",
		typeBeat: "_Southside_ Type Beat",
		musicalCharacteristic: "140|Fm",
		timing: "2:06",
	},
	{
		trackName: "Fire On Me",
		typeBeat: "_Lil Baby_ Type Beat",
		musicalCharacteristic: "136|Gm",
		timing: "2:18",
	},
	{
		trackName: "Burning Bridges",
		typeBeat: "_Lil Skies_ Type Beat",
		musicalCharacteristic: "138|Am",
		timing: "2:37",
	},
	{
		trackName: "Recharging Batteries",
		typeBeat: "_6LACK_ Type Beat",
		musicalCharacteristic: "145|Gm",
		timing: "1:49",
	},
	{
		trackName: "Loss",
		typeBeat: "_Night Lovell_ Type Beat",
		musicalCharacteristic: "150|Dm",
		timing: "1:55",
	},
	{
		trackName: "Life In Fear",
		typeBeat: "_Comethazine_ Type Beat",
		musicalCharacteristic: "130|Gm",
		timing: "1:58",
	},
	{
		trackName: "Let It Fly",
		typeBeat: "_Landon Cube_ Type Beat",
		musicalCharacteristic: "152|Fm",
		timing: "2:20",
	},
	{
		trackName: "Gang",
		typeBeat: "_Rio Da Young_ Type Beat",
		musicalCharacteristic: "200|Em",
		timing: "1:55",
	},
	{
		trackName: "Subway",
		typeBeat: "_Lil Skies_ Type Beat",
		musicalCharacteristic: "150|D#m",
		timing: "2:28",
	},
	{
		trackName: "Rockstar",
		typeBeat: "_Post Malone_ Type Beat",
		musicalCharacteristic: "145|C#m",
		timing: "2:25",
	},
	{
		trackName: "Steppin Out",
		typeBeat: "_StaySolidRocky_ Type Beat",
		musicalCharacteristic: "150|Bm",
		timing: "2:14",
	},
	{
		trackName: "Whispering Nature",
		typeBeat: "_Lil Skies_ Type Beat",
		musicalCharacteristic: "153|Cm",
		timing: "2:20",
	},
	{
		trackName: "Twenty Third",
		typeBeat: "_Landon Cube_ Type Beat",
		musicalCharacteristic: "161|Fm",
		timing: "2:11",
	},
	{
		trackName: "Sinkin Deep",
		typeBeat: "_StaySolidRocky_ Type Beat",
		musicalCharacteristic: "145|Dm",
		timing: "2:19",
	},
	{
		trackName: "Takeoff",
		typeBeat: "_Travis Scott_ Type Beat",
		musicalCharacteristic: "140|Abm",
		timing: "2:18",
	},
	{
		trackName: "Stunnin",
		typeBeat: "_Landon Cube_ Type Beat",
		musicalCharacteristic: "160|Fm",
		timing: "2:30",
	},
	{
		trackName: "Blow Ya Mind",
		typeBeat: "_Travis Scott_ Type Beat",
		musicalCharacteristic: "145|Cm",
		timing: "2:28",
	},
	{
		trackName: "Ocean View",
		typeBeat: "_Landon Cube_ Type Beat",
		musicalCharacteristic: "120|Fm",
		timing: "2:56",
	},
	{
		trackName: "Double Cup",
		typeBeat: "_Kodak Black_ Type Beat",
		musicalCharacteristic: "150|Cm",
		timing: "1:52",
	},
	{
		trackName: "Zoom Past",
		typeBeat: "_Lil Skies_ Type Beat",
		musicalCharacteristic: "150|Gm",
		timing: "2:03",
	},
	{
		trackName: "Lippy",
		typeBeat: "_Southside_ Type Beat",
		musicalCharacteristic: "110|Fm",
		timing: "2:29",
	},
	{
		trackName: "Speed It Up",
		typeBeat: "_Meek Mill_ Type Beat",
		musicalCharacteristic: "155|Dm",
		timing: "2:19",
	},
];

let cart = {
	bundles: {
		bundle1: {
			collect1: {
				type: "service",
				source: "services/artwork",
				plusProducts: 1
			},
			collect2: {
				type: "service",
				source: "services/visual",
				plusProducts: 1
			},
			price: 55,
			totalPrice: 49.99,
			discount: 5,
			active: false,
		},
		bundle2: {
			collect1: {
				type: "beat",
				beatType: "stems",
			},
			collect2: {
				type: "service",
				source: "services/mixingAndMastering",
				plusProducts: 1
			},
			price: Math.ceil(stemsBeatPrice) + 25,
			totalPrice: 105.9,
			discount: 15,
			active: false,
		},
		bundle3: {
			collect1: {
				type: "service",
				source: "services/order",
				plusProducts: 1
			},
			collect2: {
				type: "service",
				source: "services/mixingAndMastering",
				plusProducts: 1
			},
			collect3: {
				type: "service",
				source: "services/artwork",
				plusProducts: 1
			},
			collect4: {
				type: "service",
				source: "services/visual",
				plusProducts: 1
			},
			price: 180,
			totalPrice: 135,
			discount: 45,
			active: false,
		},
	},
	services: {
		artwork: {
			price: artworkPrice,
			count: 0,
			info: null,
		},
		visual: {
			price: visualPrice,
			count: 0,
			info: null,
		},
		order: {
			price: orderPrice,
			count: 0,
			info: null,
		},
		mixingAndMastering: {
			price: mixingAndMasteringPrice,
			count: 0,
			info: null,
		},
	},
	beats: {},
};

const setPrices = function () {
	trackList.forEach(function(obj){
		let
			key = reverseNameFormat(obj.trackName, "title", "key");
	
			wav = wavBeatPrice,
			stems = stemsBeatPrice,
			exclusive = exclusiveBeatPrice;
	
		// if (key === "lifetime"){
		// 	Here price Edit Code
		// };

		cart.beats[key].prices.wav = wav;
		cart.beats[key].prices.stems = stems;
		cart.beats[key].prices.exclusive = exclusive;
	});

	cart.services.artwork.price = artworkPrice;
	cart.services.visual.price = visualPrice;
	cart.services.order.price = orderPrice;
	cart.services.mixingAndMastering.price = mixingAndMasteringPrice;
};

trackList.forEach(function(obj, index){
	let
		key = reverseNameFormat(obj.trackName, "title", "key"),
		catalog = reverseNameFormat(obj.trackName, "title", "catalog"),
		typeBeat = obj.typeBeat.substr(obj.typeBeat.indexOf("_") + 1, obj.typeBeat.lastIndexOf("_") - 1),
		characteristic = obj.musicalCharacteristic.split("|"),

		wav = wavBeatPrice,
		stems = stemsBeatPrice,
		exclusive = exclusiveBeatPrice;

	// if (key === "lifetime"){
	// 	Here price Edit Code
	// };

	cart.beats[key] = {
		prices: {
			wav,
			stems,
			exclusive,
		},
		type: null,
		trackListIndex: index,
	};

	let price = cart.beats[key].prices.wav;

	document.querySelector(".beats__tracklist").innerHTML += `<div class="beats__track-item">
		<div class="audio musitem df" data-listen="${catalog}" data-index="${index + 1}">
			<div class="audio__row df">
				<div class="audio__column audio__column_1 df">
					<div class="audio__title-block">
						<div class="audio__title-row df">
							<div class="audio__preview bgi df" style="background-image: url('../audio/${catalog}/preview_min.jpg');">
								<div class="audio__play-pause">
									<span class="icon-play"></span>
									<span class="icon-pause"></span>
								</div>
							</div>
							<div class="audio__title-column">
								<div class="audio__title-container audio__title-container_stop audio__title-container_stand">
									<div class="audio__title-inner df">
										<div class="audio__title">${obj.trackName}</div>
									</div>
								</div>
								<div class="audio__type-beat">
									<span class="audio__type-beat-author">${typeBeat}</span> Type Beat
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="audio__column audio__column_2 df">
					<div class="audio__timing">${obj.timing}</div>
				</div>
				<div class="audio__column audio__column_3 df">
					<div class="audio__bpm">${characteristic[0]}</div>
				</div>
				<div class="audio__column audio__column_4 df">
					<div class="audio__key">${characteristic[1].replace("#", '<span class="icon-sharp"></span>')}</div>
				</div>
				<div class="audio__column audio__column_5 df">
					<div class="audio__contact-block">
						<div class="audio__contact-row df">
							<div class="audio__contact-column audio__contact-column_1 df">
								<div class="audio__share-block">
									<button class="audio__share" data-product="${catalog}">
										<span class="audio__icon icon-share"></span>
									</button>
								</div>
							</div>
							<div class="audio__contact-column audio__contact-column_2 df">
								<div class="audio__download-block">
									<a class="audio__download" href="../audio/${catalog}/track.mp3" target="_blank" download="${obj.trackName}">
										<span class="audio__icon icon-download"></span>
									</a>
								</div>
							</div>
							<div class="audio__contact-column audio__contact-column_3 df">
								<div class="audio__price">$${price}0</div>
							</div>
							<div class="audio__contact-column audio__contact-column_4 df">
								<div class="audio__add-block">
									<button class="audio__add df" data-product="${key}">
										Add <span class="audio__icon icon-cart"></span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="audio__column audio__column_6">
					<div class="audio__contact-block_mobile">
						<div class="audio__parameters-row df">
							<div class="audio__parameter">
								<div class="audio__parameter-icon-block">
									<span class="audio__icon icon-timing"></span>
								</div>
								<div class="audio__parameter_mobile">${obj.timing}</div>
							</div>
							<div class="audio__parameter">
								<div class="audio__parameter-icon-block">
									<span class="audio__icon icon-bpm"></span>
								</div>
								<div class="audio__parameter_mobile">${characteristic[0]}</div>
							</div>
							<div class="audio__parameter">
								<div class="audio__parameter-icon-block">
									<span class="audio__icon icon-music-key"></span>
								</div>
								<div class="audio__parameter_mobile">${characteristic[1]}</div>
							</div>
							<div class="audio__parameter">
								<button class="audio__tools-btn">
									<span class="audio__icon icon-tools"></span>
								</button>
								<div class="audio__tools df">
									<div class="audio__tools-column">
										<button class="audio__share" data-product="${catalog}">
											<span class="audio__icon icon-share"></span>
										</button>
									</div>
									<div class="audio__tools-column">
										<a class="audio__download" href="../audio/${catalog}/track.mp3" target="_blank" download="${obj.trackName}">
											<span class="audio__icon icon-download"></span>
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="audio__get-row df">
							<div class="audio__price">$${price}0</div>
							<div class="audio__add-block_mobile">
								<button class="audio__add df" data-product="${catalog}">
									Add <span class="audio__icon icon-cart"></span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`;
});