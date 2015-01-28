define(["underscore"], function(_) {
	Array.prototype.pushAll = function() {
	    for (var a = 0;  a < arguments.length;  a++) {
	        arr = arguments[a];
	        for (var i = 0;  i < arr.length;  i++) {
	            this.push(arr[i]);
	        }
	    }
	};

	Array.prototype.plusArray = function(otherArray) {
		var myCopy = _.extend([], this);
		myCopy.pushAll(otherArray);
		return myCopy;
	};

	Array.prototype.plus = function(element) {
		var myCopy = _.extend([], this);
		myCopy.push(element);
		return myCopy;
	};
});