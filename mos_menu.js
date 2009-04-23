(function(){
	var mosMenu = {
		foods: {
			/*burger*/
			'摩斯漢堡': { price: 20 , type: 'burger'},
			'摩斯芝士漢堡': { price: 22, type: 'burger' },
			'照燒牛油果漢堡': { price: 25, type: 'burger' },
			
			/* side orders*/
			'厚切薯條(S)': {price: 7, type: 'side', combo:'A'},
			'蝶蝶蝦': {price: 15, type: 'side', combo:'B'},
			'摩斯脆雞': {price: 13, type: 'side', combo:'B'}, 
			'綠田園沙律': {price: 15, type: 'side', combo:'C'},
			
			/*drink*/ 
			'摩斯紅茶': {price: 9, type:'drink'},
			'香磨咖啡': {price: 12, type:'drink'},
			'可口可樂(M)': {price: 9, type:'drink'},
			
			/* special drink (need extra money when order in set)*/
			'可口可樂(L)': {price: 11, type:'drink', plus:2},
			'鮮奶咖啡': {price: 15, type: 'drink', plus:3},
			'抺茶鮮奶': {price: 18, type: 'drink', plus:5}
			
		},
		
		meal_prototypes: [ 
			{burger: '摩斯漢堡', combo: 'A' , price: 35},
			{burger: '摩斯漢堡', combo: 'B' , price: 39},
			{burger: '摩斯漢堡', combo: 'C' , price: 40},
			{burger: '摩斯芝士漢堡', combo: 'A' , price: 37},
			{burger: '摩斯芝士漢堡', combo: 'B' , price: 41},
			{burger: '摩斯芝士漢堡', combo: 'C' , price: 42},
			{burger: '照燒牛油果漢堡', combo: 'A' , price: 40},
			{burger: '照燒牛油果漢堡', combo: 'B' , price: 44},
			{burger: '照燒牛油果漢堡', combo: 'C' , price: 45}
		],
		
		searchFood: function(criteria){
			var result = [];
			for(var f in this.foods){
				var match = true, food = this.foods[f];
				for(var c in criteria){
					if(food[c] != criteria[c]){
						match = false;
						break;
					}
				}
				if(match){
					result.push(f);
				}
			}
			return result;
		},
		
		
		getAllMeals: function(){
			var meal = {};
			for(var i=0; i<this.meal_prototypes.length; i++){
				var mealMother = this.meal_prototypes[i];
				var mealName = mealMother.burger + '套餐' + mealMother.combo + ' ';
				var sideOrders = this.searchFood({combo:mealMother.combo, type:'side'});
				for(var j=0; j<sideOrders.length; j++){
					var side = sideOrders[j];
					var drinks = this.searchFood({type:'drink'});
					for(var k=0; k<drinks.length; k++){
						var drink = drinks[k];
						meal[mealName + '[' + side + ',' + drink + ']'] = {
							price: mealMother.price + (this.foods[drink].plus || 0),
							foods: [mealMother.burger, side, drink]
						};
					}
				}
			}
			return meal;
		},
		
		/* this should be the common menu interface*/
		getMenu: function(){
			return {
				foods: this.foods,
				meals: this.getAllMeals()
			};
		}
	};

	//This is so evil! Use jsonp instead!
	window.menu = mosMenu.getMenu();

})();
