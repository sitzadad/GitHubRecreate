define(["map-extensions", "map-visitor"], function(MapExtensions, HyperMap) {
	var _ext = new MapExtensions();
	describe("Map Visitor", function() {
		var data = [
						{id: 1, productId: 1, accountId: 1, managerId: 1, value: 10},
						{id: 2, productId: 2, accountId: 1, managerId: 1, value: 10},
						{id: 3, productId: 2, accountId: 2, managerId: 1, value: 10},
						{id: 4, productId: 3, accountId: 3, managerId: 1, value: 10},
						{id: 5, productId: 3, accountId: 3, managerId: 1, value: 10},
						{id: 4, productId: 3, accountId: 4, managerId: 1, value: 10},
						{id: 5, productId: 3, accountId: 4, managerId: 2, value: 10},
						{id: 6, productId: 3, accountId: 4, managerId: 2, value: 10}
					];
		it("can group to any level", function() {

			var map = new HyperMap(data, 0, []);
			var product = function(x) {return x.productId;};
			var account = function(x) {return x.accountId;};
			var manager = function(x) {return x.managerId;};
			var bySumming = function(sum, v) { return sum + v.value; };

			var xAggregatedByProductByAccountByManager = map.by(product, "product")
															.by(account, "account")
												    		.by(manager, "manager");
			console.log(xAggregatedByProductByAccountByManager);
			expect(xAggregatedByProductByAccountByManager.points).to.eql({
				1 : {
					1 : {
						1: [{id: 1, productId: 1, accountId: 1, managerId: 1, value: 10}]
					}
				},
				2 : {
					1 : {
						1 : [{id: 2, productId: 2, accountId: 1, managerId: 1, value: 10}]
					},
					2 : {
						1 : [{id: 3, productId: 2, accountId: 2, managerId: 1, value: 10}]
					}
				},
				3 : {
					3 : {
						1: [{id: 4, productId: 3, accountId: 3, managerId: 1, value: 10},
							{id: 5, productId: 3, accountId: 3, managerId: 1, value: 10}]
					},
					4 : {
						1 : [{id: 4, productId: 3, accountId: 4, managerId: 1, value: 10}],
						2 : [{id: 5, productId: 3, accountId: 4, managerId: 2, value: 10},
							 {id: 6, productId: 3, accountId: 4, managerId: 2, value: 10}]
					}
				}
			});
		});

		it("can group to any level, accounting for all factors", function() {

			var map = new HyperMap(data, 0, []);
			var product = function(x) {return x.productId;};
			var account = function(x) {return x.accountId;};
			var manager = function(x) {return x.managerId;};
			var bySumming = function(sum, v) { return sum + v.value; };

			var xAggregatedByProductByAccountByManager = map.by(product, "product")
															.by(account, "account", [1,2,3,4,5])
												    		.by(manager, "manager");

			expect(xAggregatedByProductByAccountByManager.points).to.eql({
				1 : {
					1 : {
						1: [{id: 1, productId: 1, accountId: 1, managerId: 1, value: 10}]
					},
					2: {}, 3: {}, 4: {}, 5: {}
				},
				2 : {
					1 : {
						1 : [{id: 2, productId: 2, accountId: 1, managerId: 1, value: 10}]
					},
					2 : {
						1 : [{id: 3, productId: 2, accountId: 2, managerId: 1, value: 10}]
					}, 3: {}, 4: {}, 5: {}
				},
				3 : {
					3 : {
						1: [{id: 4, productId: 3, accountId: 3, managerId: 1, value: 10},
							{id: 5, productId: 3, accountId: 3, managerId: 1, value: 10}]
					},
					4 : {
						1 : [{id: 4, productId: 3, accountId: 4, managerId: 1, value: 10}],
						2 : [{id: 5, productId: 3, accountId: 4, managerId: 2, value: 10},
							 {id: 6, productId: 3, accountId: 4, managerId: 2, value: 10}]
					}, 1: {}, 2: {}, 5: {}
				}
			});
		});
		it("can filter", function() {

			var map = new HyperMap(data, 0, []);
			var product = function(x) {return x.productId;};
			var account = function(x) {return x.accountId;};
			var manager = function(x) {return x.managerId;};
			var bySumming = function(sum, v) { return sum + v.value; };

			var xAggregatedByProductByAccountByManager = map.by(product, "product")
															.by(account, "account", [1,2,3,4,5])
												    		.by(manager, "manager")
												    		.filter(function(x) { return x.productId == 3; });

			expect(xAggregatedByProductByAccountByManager.points).to.eql({
				1 : {
					1 : {
						1: []
					},
					2: {}, 3: {}, 4: {}, 5: {}
				},
				2 : {
					1 : {
						1 : []
					},
					2 : {
						1 : []
					}, 3: {}, 4: {}, 5: {}
				},
				3 : {
					3 : {
						1: [{id: 4, productId: 3, accountId: 3, managerId: 1, value: 10},
							{id: 5, productId: 3, accountId: 3, managerId: 1, value: 10}]
					},
					4 : {
						1 : [{id: 4, productId: 3, accountId: 4, managerId: 1, value: 10}],
						2 : [{id: 5, productId: 3, accountId: 4, managerId: 2, value: 10},
							 {id: 6, productId: 3, accountId: 4, managerId: 2, value: 10}]
					}, 1: {}, 2: {}, 5: {}
				}
			});
		});
		it("can reduce", function() {
			var map = new HyperMap(data, 0, []);
			var product = function(x) {return x.productId;};
			var account = function(x) {return x.accountId;};
			var manager = function(x) {return x.managerId;};
			var bySumming = function(sum, v) { return sum + v.value; };

			var xAggregatedByProductByAccountByManager = map.by(product, "product")
												   .by(account, "account")
												   .by(manager, "manager")
												   .reduce(bySumming);
			expect(xAggregatedByProductByAccountByManager.points).to.eql({
				1 : {
					1 : {
						1: 10
					}
				},
				2 : {
					1 : {
						1 : 10
					},
					2 : {
						1 : 10
					}
				},
				3 : {
					3 : {
						1: 20
					},
					4 : {
						1 : 10,
						2 : 20
					}
				}
			});
		});

		it("can drill down to arbitrary levels to execute arbitrary operations", function() {
			var map = new HyperMap(data, 0, []);
			var product = function(x) {return x.productId;};
			var account = function(x) {return x.accountId;};
			var manager = function(x) {return x.managerId;};
			var bySumming = function(sum, v) { return sum + v.value; };

			var xAggregatedByProductByAccountByManager = map.by(product, "product")
												   .by(account, "account")
												   .by(manager, "manager")
												   .reduce(bySumming);
			var generator = xAggregatedByProductByAccountByManager.downTo("manager");
			var generated = generator(function(a, topLevelKeys) {
				console.log("Top level keys are: ");
				console.log(topLevelKeys);
				return _ext.map(a, function(k) {return k*100;}, function(v) {return v * 3;});
			});

			expect(generated.points).to.eql({
				1 : {
					1 : {
						100: 30
					}
				},
				2 : {
					1 : {
						100 : 30
					},
					2 : {
						100 : 30
					}
				},
				3 : {
					3 : {
						100 : 60
					},
					4 : {
						100 : 30,
						200 : 60
					}
				}
			});
		});
	});
});
