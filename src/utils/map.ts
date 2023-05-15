import Icon from "ol/style/Icon";
import Style from "ol/style/Style";

export const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: '/images/icon/point.png',
    width: 16,
    height: 16
  }),
});