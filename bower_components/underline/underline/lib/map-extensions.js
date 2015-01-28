define(["underscore", "array-extensions"], function(_) {
	return function() {
        var self = this;
        this.mapValue = function(map, valueMapping) {
            var transformed = {};
            _.each(map, function(v, k, all) {
                transformed[k] = valueMapping(v, k);
            });
            return transformed;
        };
        this.mapKey = function(map, keyMapping) {
            var transformed = {};
            _.each(map, function(v, k, all) {
                transformed[keyMapping(k, v)] = v;
            });
            return transformed;
        };
        this.map = function(map, keyMapping, valueMapping) {
            var transformed = {};
            _.each(map, function(v, k, all) {
                transformed[keyMapping(k, v)] = valueMapping(v, k);
            });
            return transformed;
        };

        this.zipByName = function(mapSpecs, defaultValue) {
            var allKeys =
                _.uniq(_.flatten(_.map(mapSpecs, function(mapSpec) {
                    return _.keys(mapSpec.mapping);
                }), true));
            var zipped = {};
            _.each(allKeys, function(key) {
                zipped[key] = {};
                _.each(mapSpecs, function(mapSpec) {
                    zipped[key][mapSpec.name] = mapSpec.mapping[key] ? mapSpec.mapping[key] : (defaultValue || {});
                });
            });
            return zipped;
        };

        this.zip = function(maps) {
            var allKeys =
                _.uniq(_.flatten(_.map(maps, function(mapSpec) {
                    return _.keys(mapSpec);
                }), true));
            var zipped = {};
            _.each(allKeys, function(key) {
                zipped[key] = [];
                var valuesForKey = _.map(maps, function(map) {
                    return map[key];
                });
                zipped[key].pushAll(_.filter(valuesForKey, function(value) { return value; }));
            });
            return zipped;
        };

        this.groupBy = function(map, groupBy, allFactors, defaultValue) {
            var grouped = _.groupBy(map, groupBy);
            _.each(allFactors, function(factor) {
                if (grouped[factor]) return;
                grouped[factor] = defaultValue || [];
            });
            return grouped;
        };
    };
});
