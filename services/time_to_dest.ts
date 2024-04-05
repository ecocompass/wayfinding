const avg_speeds = {
    walk: 4,
    bus: 15,
    luas: 25,
    dart: 60,
    bike: 8,
    car: 30,
};

export const mode_distances = {
    distance_walk: "Walking",
    distance_luas: "Luas",
    distance_bus: "Bus",
    distance_bike: "Bike",
    distance_car: "Drive",
    distance_dart: 'Dart',
};

export function getTimeFromDistance(distanceArr, modes) {
    let timeTaken = 0;
    distanceArr.forEach((seg, index) => {
        timeTaken = timeTaken + seg / avg_speeds[modes[index]];
    });

    return String(Math.floor(timeTaken * 60));
}

export function getTimeFromDistanceSingle(mode, distance) {
    return String(Math.floor((distance / avg_speeds[mode]) * 60));
}
