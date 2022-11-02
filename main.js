// ---------------------------- read cars 🚔🚗🚘🚙🏎️----------------------------------
// import { promises as fsPromises} from 'fs';
const { readFileSync, promises: fsPromises } = require("fs");
// ✅ read file ASYNCHRONOUSLY
async function asyncReadFile(filename) {
  try {
    const contents = await fsPromises.readFile(filename, "utf-8");

    const arr = contents
      .split(/\r?\n/)
      .map((attributes) => {
        return attributes.split(",");
      })
      .map((attributes) => {
        const car = {};
        car["className"] = attributes[6]; //6
        car["buying"] = attributes[0]; // 0
        car["maint"] = attributes[1]; // 1
        car["doors"] = attributes[2]; // 2
        car["persons"] = attributes[3]; // 3
        car["lug_boot"] = attributes[4]; // 4
        car["safety"] = attributes[5]; // 5

        return car;
      });

    // console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']
    return arr;
  } catch (err) {
    console.log(err);
  }
}
let cars = [];
asyncReadFile("./car.data")
  .then((data) => {
    cars = data;
  })
  .finally(() => {
    console.log(malibu);
    console.log(cars.length);
    const res = main(malibu);
    console.log("class: ", res.className);
    console.log("percentage: ", Math.floor((res.maxPts * 100) / 6) + "%");
  }); // main()
// ---------------------------- class Car 🚗----------------------------------
class Car {
  constructor(buying, maint, doors, persons, lug_boot, safety) {
    return {
      buying,
      maint,
      doors,
      persons,
      lug_boot,
      safety,
    };
  }
}

var malibu = new Car("vhigh", "high", 2, "more", "small", "low");
// console.log("🚘: ", malibu);
// ---------------------------- function main() 🤖 ----------------------------------
// console.log(cars);
function main(current) {
  let className = "";
  let maxPts = 0;
  let pts = 0;

  for (let car of cars) {
    pts = 0;
    for (let key in car) {
      if (car[key] == current[key]) {
        pts++;
      }
    }
    if (maxPts < pts) {
      maxPts = pts;
      className = car.className;
    }
  }

  return { className, maxPts };
}
