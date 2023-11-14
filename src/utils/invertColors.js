export function invertColor(hex, bw) {
    if (hex.indexOf("#") === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error("Invalid HEX color.");
    }
    var r = parseInt(hex.slice(0, 2), 16);
    var g = parseInt(hex.slice(2, 4), 16);
    var b = parseInt(hex.slice(4, 6), 16);

    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
    }

    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join("0");
    return (zeros + str).slice(-len);
}

function ASCIISuma(array) {
    let suma = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            let char_code = array[i].charCodeAt(j);
            suma += char_code;
        }
    }
    return suma;
}

export const stringToColour = (str) => {
    // 15 -> 85
    const COLORS = [
        "#783037",
        "#A12530",
        "#CC0A1B",
        "#CF2A38",
        "#E3646F"
    ]

    const asci = ASCIISuma(str);
    const validIndex = asci % COLORS.length;
    return COLORS[validIndex];
}