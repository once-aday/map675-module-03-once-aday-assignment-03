# map675-module-03-once-aday-assignment-03

#### Client and Server Side Processing Scripts

**Client:**

- [Concatenate Attribute Results of overlapping Polygons within a Multi-polygon by a Specific Attribute]()


**Server:**

Concatenate Attribute Results of Multi-Polygon (Dataset B) that Intersects with a Multi-Polygon (Dataset A) by a Specific Attribute.

Distance from many polygons



### Concatenate Attribute Results of overlapping Polygons within a Multi-polygon by a Specific Attribute

Create 2 datasets with overlapping Polygons. Choose an Attribute to monitor.

I was able to get the script working by using the intersect method of turf

There were lots of bugs with multi polygons when I brought in a complex geology dataset.

I had to impliment a lot of error handling for when turf attempts to read the JSON object as a polygon and execute intersect. If there is a geometry error I assume that the json object/polygon has deeper arrays in it's structure and continue to loop through the geeometry and attempt to convert it to a polygon. I do this for about "3 levels" and if it goes deeper than that I stop. For the complicated geology dataset this gave good results.

I also had to simplify some of the topology for the geology dataset because it was causing errors with the Turf intersect function:

`let poly2 = turf.polygon(turf.cleanCoords(y['geometry']['coordinates']),{"intersectingValue":y['properties'][ds1AttributeName]})`

Here I use turf.cleanCoords to remove redudant coordinates from the geometry.

https://turfjs.org/docs/#cleanCoords

In that example I am also converting the raw JSON coordinates to a polygon and adding the attribute from the JSON object to the new Turf-ready Polygon. So that if there is a successful intersect that attribute value will carry over to the Polygon and I can also use it to push to the final intersectingAttributes array that is presented to that client.
