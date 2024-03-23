const avg_speeds = {
    "walk": 4,
    "bus": 15,
    "luas": 25,
    "dart": 60
}

export function getTimeFromDistance(distanceArr, modes) {
    let timeTaken = 0;
    distanceArr.forEach((seg, index) => {
        timeTaken = timeTaken + seg / avg_speeds[modes[index]];
    });

    return String(Math.floor(timeTaken * 60))
}