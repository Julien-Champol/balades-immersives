import { useMap } from 'react-leaflet/hooks';

const ZoomController = (props) => {

  const map = useMap();

  const position = props.position;

  const zoom = props.zoom;

  if (position) {
    map.closePopup();
    map.setView(position, zoom);
  }

  return null;
}

export default ZoomController;