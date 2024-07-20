import React from "react";
import polyline from "@mapbox/polyline";
import { Marker, MapContainer, TileLayer, Popup, Polyline } from "react-leaflet";
import L from "leaflet"; // Import the Leaflet library
import "leaflet/dist/leaflet.css";

const mapConfig = JSON.parse(process.env.NEXT_PUBLIC_MAP_CONFIG);
export default function Map({ route, location }) {
  const svgMarkup =
    '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="35" height="30" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill="#9747FF" d="M256 32.31c85.36 0 154.53 69.2 154.53 154.53 0 64-114.82 220.49-154.53 292.07-38.07-68.7-154.53-231.83-154.53-292.07 0-85.33 69.2-154.53 154.53-154.53zm69.07 148.71c0-38.03-31.02-69.05-69.07-69.05-38.02 0-69.04 31.02-69.04 69.05 0 38.02 31.02 69.04 69.04 69.04 38.05 0 69.07-31.02 69.07-69.04z" data-original="#e74c3c" class=""></path></g></svg>';

  const iconSvg = L.divIcon({
    className: "custom-div-icon",
    html: '<div id="colored-svg">' + svgMarkup + "</div>",
    iconSize: [10, 10],
    iconAnchor: [15, 42],
  });

  const decodedPolyline = polyline.decode(route);
  const latLngs = decodedPolyline.map((point) => [point[0], point[1]]);

  return (
    <React.Fragment>
      <MapContainer
        className="w-full h-[30rem] z-10"
        center={[location.pickup.latitude, location.pickup.longitude]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[location.pickup.latitude, location.pickup.longitude]} icon={iconSvg}>
          <Popup>{location.pickup.name}</Popup>
        </Marker>
        <Marker position={[location.drop.latitude, location.drop.longitude]} icon={iconSvg}>
          <Popup>{location.drop.name}</Popup>
        </Marker>

        <Polyline positions={latLngs} color="#FF3B9D" />
      </MapContainer>
    </React.Fragment>
  );
}
