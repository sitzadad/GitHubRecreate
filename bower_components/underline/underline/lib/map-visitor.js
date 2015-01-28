define(["underscore", "map-extensions"], function(_, MapExtensions) {
    return function hyper(points, level, sequence) {
        var self = this;
        this.sequence = sequence || [];
        this.points = points;
        this.level = level || 0;

        var _ext = new MapExtensions();
        var recursiveBy = function myself(f, currentStructure, currentLevel) {
            if (currentLevel == 0) return f(currentStructure);
            return _ext.mapValue(currentStructure, function(potentialArray) {
                return myself(f, potentialArray, currentLevel - 1);
            })
        };

        var recursiveByName = function myself(f, currentStructure, currentLevel, factorName, higherLevelKeys) {
            if (sequence[currentLevel] === factorName) return f(currentStructure, higherLevelKeys);
            if (currentLevel >= level) throw { error: "Ran out of depth." };
            return _ext.mapValue(currentStructure, function(potentialArray, key) {
                return myself(f, potentialArray, currentLevel + 1, factorName, higherLevelKeys.plus(key));
            })
        };
        this.by = function(f, groupingId, allFactors) {
            var newSequence = [];
            newSequence.push(sequence);
            newSequence.push(groupingId);
            newSequence = _.flatten(newSequence);
            return new hyper(recursiveBy(function(arr) {
                return _ext.groupBy(arr, f, allFactors);
            }, points, level), level + 1, newSequence);
        };

        this.filter = function(f) {
            return new hyper(recursiveBy(function(arr) {
                return _.filter(arr, f);
            }, points, level), level, sequence);
        };

        this.reduce = function(f, initial) {
            initial = initial || 0;
            return new hyper(recursiveBy(function(arr) {
                return _.reduce(arr, f, initial);
            }, points, level), level, sequence);
        };

        this.downTo = function(factorName) {
            return function(f) {
                return new hyper(recursiveByName(f, points, 0, factorName, []), level, sequence);
            };
        }
    };
});
