underline
=========

NOTE: Underline depends upon underscore, and its components are packaged as RequireJS modules.
Methods to make handling JavaScript objects/maps easier

Use underline to make manipulating maps easier.

There are two components available:

* map-extensions
* map-visitor

map-extensions
=================

map-extensions adds the following methods:

* mapKey
* mapValue
* map
* zipByName
* zip
* groupBy

map-visitor
=================

Given an array of JSON objects, map-visitor allows you to build nested maps based on criteria that you pass in through chained "by()" calls, like so:

var p = new MapVisitor(people);
p.by(function(person) { return person.Organisation; }, "organisation")
 .by(function(person) { return person.Designation; }, "designation");

Examples may be found in the tests folder.

