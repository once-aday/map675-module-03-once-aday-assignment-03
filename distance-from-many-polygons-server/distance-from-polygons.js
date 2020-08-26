const fs = require("fs");
const turf = require("@turf/turf");

const inFilePath = __dirname + "/data/ds1.json"; // example multi-polygon dataset

fs.readFile(inFilePath, "utf8", (err, data) => {
  if (err) throw err;
  const polygons = JSON.parse(data);
  distanceFromPolygons(polygons);

});

function distanceFromPolygons(data) {
  console.log("Distance from polygons")
  var point = turf.point([-124.45,43.35]); // Specify a point location

  turf.featureEach(turf.polygon(data), function (currentFeature, featureIndex) {
    c = 0
    for (x in currentFeature) {
      try {
        let polyCenter = turf.centroid(turf.polygon(currentFeature['geometry']['coordinates']['features'][c]['geometry']['coordinates']));
        let distance = turf.distance(point, polyCenter);
        console .log(distance)
        c += 1
      }
      catch {
      }
    }
  });
}
