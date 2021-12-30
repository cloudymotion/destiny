// let scrt1 = (['.', "b", 'a', 's', 'k', 'e', 't', '_', '_', 'l', 'i', 'n', 'k']).join("");
// let scrt2 = (["b", 'a', 's', 'k', 'e', 't', '_', '_', 'l', 'i', 'n', 'k', '_', 'l', 'o', 'c', 'k']).join("");
// let scrt3 = (["c", 'l', "i", "c", "k"]).join("");

// $(scrt1).on(scrt3, function(){
// 	if (this.classList.contains(scrt2)){
// 		return;
// 	};

// 	setPrices();

// 	setTimeout(() => {
// 		let bool = false, price = 0;

// 		for(let key in cart.services){
// 			if (cart.services[key].count){
// 				bool = true;
// 				price += cart.services[key].price * cart.services[key].count;
// 			};
// 		};

// 		if (!bool){
// 			for(let key in cart.beats){
// 				if (cart.beats[key].type){
// 					bool = true;
// 					price += cart.beats[key].prices[cart.beats[key].type];
// 				};
// 			};
// 		};

// 		if (!bool){
// 			for(let key in cart.bundles){
// 				if (cart.bundles[key].active){
// 					bool = true;
// 					break;
// 				};
// 			};
// 		};

// 		if (!bool){
// 			return;
// 		};
// 	}, 0);
// });