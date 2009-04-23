	var macMenu =  {
		foods: {
			'雙層芝士孖堡': { price: 12.5 },
			'至尊漢堡': 	{ price: 16.8 },
			'中薯條':		{ price: 8.8 },
			'中可樂':		{ price: 8.5 }
		},
		
		meals: {
			'雙層芝士孖堡套餐': { price: 23.8, foods: [ '雙層芝士孖堡', '中薯條', '中可樂' ]},
			'至尊漢堡套餐': { price: 26.6, foods: [ '至尊漢堡', '中薯條', '中可樂' ]}
		},
		
		getMenu: function(){
			return { foods:this.foods, meals: this.meals };
		}
	};

	//This is so evil! Use jsonp instead!
	window.menu = macMenu.getMenu(); 


