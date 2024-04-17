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

export function getTimeFromDistance(distanceArr: any, modes: any) {
    let timeTaken = 0;
    distanceArr.forEach((seg: any, index: any) => {
        timeTaken = timeTaken + seg / avg_speeds[modes[index]];
    });

    return String(Math.floor(timeTaken * 60));
}

export function getTimeFromDistanceSingle(mode: any, distance: any) {
    return String(Math.floor((distance / avg_speeds[mode]) * 60));
}

export const formatTime = (end: any, start: any) => {
    let diff = end - start;
    let mins = Math.trunc(diff / 1000 / 60);
    let hours = 0;
    if (mins < 60) {
        return `${mins} Mins`;
    } else {
        hours = Math.trunc(diff / 1000 / 60 / 60);
        mins = Math.trunc((diff % (1000 * 60 * 60)) / 1000 / 60);
        return `${hours} Hrs ${mins} Mins`;
    }
};
