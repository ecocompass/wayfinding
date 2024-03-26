/* eslint-disable prettier/prettier */

import { getTimeFromDistanceSingle } from "./time_to_dest";

const mapModeToInstruction: any = {
    "walk": 'Walk to ',
    "bus": 'Take bus to ',
    "luas": 'Take luas to ',
}

export function process_path(response: any) {
    let returnRecc: any = [];
    response.recommendationList.forEach((recc, index) => {
        if (recc.modePathList.length) {
            returnRecc.push({
                displayModes: recc.transitions.split('-').filter(mode => mode.length),
                modePathList: recc.modePathList,
                pathId: index,
                isViewed: index ? false : true,
                // isViewed: false,
                pathDistance: recc.modePathList.map((mode) => {
                    return mode.distance;
                }),
            });
        }
    });
    return returnRecc;
}

export function getPathInstructions(path: any, destinationName: string) {
    let instructionArr: any = [];
    path.modePathList.forEach((p: any, index) => {
        if (index !== path.modePathList.length - 1) {
            if (p.mode === 'walk') {
                instructionArr.push({
                    instruction: `${mapModeToInstruction[p.mode]} ${path.modePathList[index + 1].startStopName}`,
                    time: `${getTimeFromDistanceSingle(p.mode, p.distance)} mins`,
                });
            } else {
                instructionArr.push({
                    instruction: `${mapModeToInstruction[p.mode]} ${p.endStopName}`,
                    time: `${getTimeFromDistanceSingle(p.mode, p.distance)} mins`,
                });
            }
        } else {
            instructionArr.push({
                instruction: `${mapModeToInstruction[p.mode]} ${destinationName}`,
                time: `${getTimeFromDistanceSingle(p.mode, p.distance)} mins`,
            });
        }
    });

    return instructionArr;
}
