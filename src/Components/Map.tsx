import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw-src.css";

export type MapProps = {
  onAreaDrawn: (coordinates: string) => void;
};

interface DrawCreatedEvent {
  layer: L.Layer;
  layerType: string;
}

export const Map = ({ onAreaDrawn }: MapProps) => {
  const handleCreated = (event: DrawCreatedEvent) => {
    const { layer, layerType } = event;

    if (layerType === "polygon" || layerType === "rectangle") {
      const shapeLayer = layer as L.Polygon;

      const bounds = shapeLayer.getBounds();

      const center = bounds.getCenter();

      const coordsString = `${center.lat.toFixed(6)}, ${center.lng.toFixed(6)}`;

      onAreaDrawn(coordsString);
    }
  };

  return (
    <MapContainer
      center={[53.903651, 27.556044]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FeatureGroup>
        <EditControl
          position="bottomright"
          onCreated={handleCreated}
          draw={{
            rectangle: true,
            polygon: true,
            circle: false,
            marker: false,
            polyline: false,
            circlemarker: false,
          }}
          edit={{
            edit: false,
            remove: true,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};
