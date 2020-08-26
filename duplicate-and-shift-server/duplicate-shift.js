const turf = require("@turf/turf");
const fs = require("fs")

const outFilePath = "data/duplicated-lines.json";
// How many duplicates?
var duplicates = 5

// How many kilometers to shift each successive line? (Default is Kilometers)
var shiftMeters = 10

// What Direction should they shift? 0.0 = north, 180.0 = south
const shiftDirection = 0.0

var collectedFeatures = []
var shift = 0

while (duplicates > 0) {
  // text += "The number is " + duplicates;
  var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]], {color: 'red'});
  var lineCloned = turf.clone(line);
  var translatedLine = turf.transformTranslate(lineCloned, shift, shiftDirection);
  collectedFeatures.push(translatedLine);
  shift += shiftMeters
  duplicates--;
}

var collection = turf.featureCollection(collectedFeatures)

fs.writeFile(outFilePath, JSON.stringify(collection), "utf-8", err => {
    if (err) throw err;
    console.log("done writing file");
  });
