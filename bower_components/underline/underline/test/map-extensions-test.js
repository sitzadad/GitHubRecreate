define(["map-extensions"], function(MapExtensions) {
	var _ext = new MapExtensions();
	describe("Map Extensions", function() {
		it('can transform map values', function() {
			var data = {label1: 23, label2: 34, label3: 645};
			var transformed = _ext.mapValue(data, function(v, k) {return v * 2;});
			expect(transformed).to.eql({label1: 46, label2: 68, label3: 1290});
		});
		it('can transform map keys', function() {
			var data = {label1: 23, label2: 34, label3: 645};
			var transformed = _ext.mapKey(data, function(k, v) {return k + "_extension";});
			expect(transformed).to.eql({label1_extension: 23, label2_extension: 34, label3_extension: 645});
		});
		it('can transform map entries', function() {
			var data = {label1: 23, label2: 34, label3: 645};
			var transformed = _ext.map(data, function(k, v) {return k + "_extension";}, function(v, k) {return v * 2});
			expect(transformed).to.eql({label1_extension: 46, label2_extension: 68, label3_extension: 1290});
		});
		it('can merge maps', function() {
			var data1 = {label1: 23, label2: 34, label3: 645};
			var data2 = {label2: 10, label3: 20, label5: 30};
			var transformed = _ext.zip([data1, data2]);
			expect(transformed).to.eql({label1: [23], label2: [34, 10], label3: [645, 20], label5: [30]});
		});
		it('can merge maps with separate names', function() {
			var margins = {p1: [23, 45], p2: 34, p3: 645};
			var sales = {p1: 10, p2: 20, p3: 30, p4: [16, 67]};
			var marginsSpec = {name: "margins", mapping: margins};
			var salesSpec = {name: "sales", mapping: sales};
			var transformed = _ext.zipByName([marginsSpec, salesSpec]);
			console.log(transformed);
			expect(transformed).to.eql({
				p1: {
						sales: 10, margins: [23, 45]
					},
				p2: {
						sales: 20, margins: 34
					},
				p3: {
						sales: 30, margins: 645
					},
				p4: {
						sales: [16, 67], margins: {}
					}
			});
		});
		it('can merge maps with separate names with defaults for undefined values', function() {
			var margins = {p1: [23, 45], p2: 34, p3: 645};
			var sales = {p1: 10, p2: 20, p3: 30, p4: [16, 67]};
			var marginsSpec = {name: "margins", mapping: margins};
			var salesSpec = {name: "sales", mapping: sales};
			var transformed = _ext.zipByName([marginsSpec, salesSpec], {value: "Default"});
			console.log(transformed);
			expect(transformed).to.eql({
				p1: {
						sales: 10, margins: [23, 45]
					},
				p2: {
						sales: 20, margins: 34
					},
				p3: {
						sales: 30, margins: 645
					},
				p4: {
						sales: [16, 67], margins: {value: "Default"}
					}
			});
		});
		it('can group by criterion, accounting for all factors', function() {
			var toBeGrouped = [
				{id: 1, value: "A"},
				{id: 2, value: "A"},
				{id: 3, value: "B"},
				{id: 4, value: "B"},
				{id: 5, value: "C"},
				{id: 6, value: "C"}
			];
			var transformed = _ext.groupBy(toBeGrouped, function(v) { return v.value; }, ["A", "B", "C", "D", "E"]);
			console.log(transformed);
			expect(transformed).to.eql({ A: [
												{id: 1, value: "A"},
												{id: 2, value: "A"}
											], 
										B: [
												{id: 3, value: "B"},
												{id: 4, value: "B"}
											], 
										C: [
												{id: 5, value: "C"},
												{id: 6, value: "C"}
											], 
										D: [],
										E: []});
		});
	});
});
