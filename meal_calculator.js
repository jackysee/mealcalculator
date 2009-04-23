var mealCalculator = {

	setMenu: function(menu){
		this.menu = menu;
		this.orderedMeals = null;
	},

	getOrderedMeals: function(){
		if(!this.orderedMeals){ // call on demand
			var orderedMeals = [];
			for(var m in this.menu.meals){
				orderedMeals.push(m);
			}
			var m = this;
			this.orderedMeals = orderedMeals.sort(function(a,b){
				return m.getMoneySavedByMeal.call(m, b) - m.getMoneySavedByMeal.call(m, a);
			});
		}
		return this.orderedMeals;
	},
	
	calculate: function(input){
		var foods = this.getValidFoods(input), 
			meal = this.getWorthiestMeal(foods),
			result = [];
		while(meal != null){
			result.push(meal);
			foods = this.subtractMealFoodFromItems(foods, meal);
			meal = this.getWorthiestMeal(foods);
		}
		return $.merge(result,foods);
	},
	
	getValidFoods: function(val){
		if(!val) return [];
        if(!$.isArray(val)) val = val.split(",")
		var m = this;
		var inputItems = $.map(val, function(n){ 
			return $.trim(n); 
		});
		var outputItems = $.grep(inputItems, function(n){
			return m.menu.foods[$.trim(n)] != null;
		});
		return outputItems;
	},
	
	getWorthiestMeal: function(items){
		for(var i=0; i<this.getOrderedMeals().length; i++){
			var meal = this.getOrderedMeals()[i];
			if(this.matchMealFood(items, meal)){
				return meal;
			}
		}
		return null;
	},
	
	matchMealFood: function(items, meal){
		var foods = this.menu.meals[meal].foods;
		for(var f in foods){
			var index = $.inArray(foods[f], items);
			if(index == -1){
				return false;
			}
			else{
				items = $.grep(items, function(n,i){
					return  i!=index;
				});
			}
		}
		return true;
	},
	
	getMoneySavedByMeal: function(meal){
		var meal = this.menu.meals[meal];
		if(!meal) 
			return 0;
		var foods = this.menu.foods;
		var individualTotal = 0;
		$.each(meal.foods, function(i, n){
			individualTotal += foods[n].price;
		});
		return individualTotal - meal.price;
	},
	
	subtractMealFoodFromItems: function(items, meal){
		var foods = this.menu.meals[meal].foods;
		for(var f in foods){
			var index = $.inArray(foods[f], items);
			items = $.grep(items, function(n,i){
				return i!=index;
			});
		}
		return items;
	}
	
}

