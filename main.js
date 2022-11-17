import "./style.css";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Feature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import Point from "ol/geom/Point";
import OSM from "ol/source/OSM";
import { Icon, Style } from "ol/style";
import UPNG from "upng-js";

// https://stackoverflow.com/questions/39458511/how-to-use-es6-import-for-upngImages
// 48x48 png, downloaded from https://materialdesignicons.com/
import res from "./flag-checkered.png?raw-hex";

// https://stackoverflow.com/questions/38987784/how-to-convert-a-hexadecimal-string-to-uint8array-and-back-in-javascript
const fromHexString = (hexString) =>
    Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

// https://github.com/photopea/UPNG.js
let upngImage = UPNG.decode(fromHexString(res));
let rgba8 = UPNG.toRGBA8(upngImage)[0];

// rgba8 is an arrayBuffer
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
// It can be accessed and modified through a TypedArray
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

let myCanvas = document.createElement("canvas");
let myContext = myCanvas.getContext("2d");
myCanvas.width = upngImage.width;
myCanvas.height = upngImage.height;
const upngImageData = new ImageData(
    new Uint8ClampedArray(rgba8),
    upngImage.width,
    upngImage.height
);
myContext.putImageData(upngImageData, 0, 0);

// We have now a canvas filled with the PNG image
// Create the corresponding icon, the style, the feature, the layer
// and use it on the map

let myStyle = new Style({
    image: new Icon({
        anchor: [0, 1],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        crossOrigin: "anonymous",
        img: myCanvas,
        imgSize: [upngImage.width, upngImage.height],
        rotation: Math.PI / 6,
        color: "red",
    }),
});

const myFeature = new Feature(new Point([0, 0]));
myFeature.setStyle(myStyle);

const map = new Map({
    target: "map",
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        new VectorLayer({
            source: new VectorSource({ features: [myFeature] }),
        }),
    ],
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});
