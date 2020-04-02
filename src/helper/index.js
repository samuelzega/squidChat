import { Dimensions } from "react-native";

const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width

const m1 = screenWidth * .01
const m2 = screenWidth * .02
const m3 = screenWidth * .03
const m4 = screenWidth * .04
const m5 = screenWidth * .05
const customMargin = { m1, m2, m3, m4, m5 }


export {
    screenHeight,
    screenWidth,
    customMargin
}