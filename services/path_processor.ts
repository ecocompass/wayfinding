/* eslint-disable prettier/prettier */

import { getTimeFromDistanceSingle } from "./time_to_dest";

export const mapModeToInstruction: any = {
    "walk": 'Walk to ',
    "bus": 'Bus no. ',
    "luas": 'Take luas ',
    "car": 'Drive to ',
    "bike": 'Bike to ',
};

function getSum(acc, val) {
    return acc + val
}

export function process_path(response: any) {
    let returnRecc: any = [];
    response.recommendationList.forEach((recc: any, index: any) => {
        let reccCarbonEmission = 0;
        if (recc.modePathList.length) {
            returnRecc.push({
                displayModes: recc.transitions.split('-').filter(mode => mode.length),
                modePathList: recc.modePathList,
                pathId: index,
                isViewed: index ? false : true,
                pathDistance: recc.modePathList.map((mode) => {
                    reccCarbonEmission = reccCarbonEmission + mode.carbonEmissions;
                    return mode.distance;
                }),
                recommendationId: recc.recommendationId,
                trafficSegment: recc.traffic,
                totalCarbonEmission: reccCarbonEmission,
                isLowestCarbon: false,
            });
        }
    });
    let lowestCarbonEmmission = 1;
    let lowestCarbonEmmissionIndex = 0;
    returnRecc.forEach((recc, index) => {
        if (recc.displayModes.length > 1 && recc.totalCarbonEmission < lowestCarbonEmmission) {
            lowestCarbonEmmissionIndex = index;
        }
    });

    returnRecc[lowestCarbonEmmissionIndex].isLowestCarbon = true;
    return returnRecc;
}

export function getPathInstructions(path: any, destinationName: string) {
    let instructionArr: any = [];
    path.modePathList.forEach((p: any, index) => {
        if (index !== path.modePathList.length - 1) {
            if (p.mode === 'walk' || p.mode === 'car' || p.mode === 'bike') {
                instructionArr.push({
                    instruction: `${mapModeToInstruction[p.mode]} ${path.modePathList[index + 1].startStopName}`,
                    time: `${getTimeFromDistanceSingle(p.mode, p.distance)} mins`,
                    distance: p.distance,
                    isCleared: false,
                });
            } else {
                instructionArr.push({
                    instruction: `${mapModeToInstruction[p.mode]}${p.routeNumber} to ${p.endStopName}`,
                    time: `${getTimeFromDistanceSingle(p.mode, p.distance)} mins`,
                    distance: p.distance,
                    isCleared: false,
                });
            }
        } else {
            instructionArr.push({
                instruction: `${mapModeToInstruction[p.mode]} ${destinationName}`,
                time: `${getTimeFromDistanceSingle(p.mode, p.distance)} mins`,
                distance: p.distance,
                isCleared: false,
            });
        }
    });

    return instructionArr;
}

export const processPathCleared = (pointList, userLocation, userPosition, isFinalSegment = false) => {

    if (userPosition + 1 === pointList.length) {
        if (isFinalSegment) {
            return { action: "ENDTRIP" }
        }
        return { action: "CHANGESEGMENT" };
    }

    else if (pointList[userPosition], pointList[userPosition + 1]) {
        let pathLineDist = getPointLineDistance(pointList[userPosition], pointList[userPosition + 1], userLocation);
        if (pathLineDist > 0.01) {
            return { action: 'REROUTE' };
        }

        let d1 = getPointDistance(pointList[userPosition], userLocation);
        let d2 = getPointDistance(pointList[userPosition + 1], userLocation);
        userPosition = userPosition + 1;

        if (d2 < d1) {
            return { action: 'UPDATE', payload: userPosition };
        } else {
            return { action: '' };
        }
    } else {
        return { action: '' };
    }
};

const getPointDistance = (a, b) => {
    return Math.sqrt(Math.pow((a[0] - b[0]), 2) + Math.pow((a[1] - b[1]), 2))
}

const getPointLineDistance = (a, b, c) => {
    return Math.abs(((a[0] - b[0]) * (c[1] - a[1])) - ((b[1] - a[1]) * (c[0] - a[0]))) / getPointDistance(a, b)
}

export const getUserPositionInSegment = (pointList: any, userLocation: any) => {
    let position = 0;

    while (position < pointList.length) {
        let d1 = getPointDistance(pointList[position], userLocation);
        let d2 = getPointDistance(pointList[position + 1], userLocation);

        if (d1 < d2) {
            break;
        }
    }

    return position;
};