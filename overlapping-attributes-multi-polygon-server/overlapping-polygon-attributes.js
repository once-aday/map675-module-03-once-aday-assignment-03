const fs = require("fs");
const turf = require('@turf/turf')

const ds1Path = "data/ds1.json"
const ds2Path = "data/ds2.json"
const ds1AttributeName = "Name"

// Promise.all([ds1, ds2]).then(process())


fs.readFile(ds1Path, 'utf8', (err, data) => {
  if (err) throw err;
  const ds1 = JSON.parse(data);
  fs.readFile(ds2Path, 'utf8', (err, data) => {
    if (err) throw err;
    // remember to parse the incoming GeoJSON text
    const ds2 = JSON.parse(data);
    process([ds1,ds2])
  })
})




function process(data) {
  let intersectingValues = []
  // Loop through each feature in DS2, collect all intersecting instances of DS1 and save the Name Property //
  // intersectingValues Array
  console.log("Looping through DS2 and checking intersecting values with DS1..")
  for (x of data[1]['features']) {
    console.log(x['geometry']['coordinates'][0])
    let poly1 = turf.polygon(x['geometry']['coordinates'][0])
    // Checking Intersecting Values with DS1..
    for (y of data[0]['features']) {
      console.log(y)
      try {
        let poly2 = turf.polygon(turf.cleanCoords(y['geometry']['coordinates'][0]),{"intersectingValue":y['properties'][ds1AttributeName]})
        if (turf.intersect(poly1, poly2)) {
          console.log("Found an intersection!")
          intersectingValues.push(y['properties'][ds1AttributeName])
        } else {
          // console.log("No intersection found..")
        }
      }
      catch(err) {
        for (z of y['geometry']['coordinates']) {
          try {
            let poly2 = turf.polygon(z,{"intersectingValue":y['properties'][ds1AttributeName]})
            if (turf.intersect(poly1, poly2)) {
              console.log("Found an intersection!")
              intersectingValues.push(y['properties'][ds1AttributeName])
            } else {
              // console.log("No intersection found..")
            }
          }
          catch(err) {
            // console.log(err)
          }
        }
      }
    }
  }
  console.log("Final Intersecting Values..");
  // console.log(intersectingValues);
  let intersectingValuesUnique = [...new Set(intersectingValues)];
  console.log(intersectingValuesUnique);

}
