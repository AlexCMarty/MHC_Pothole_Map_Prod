"use client";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Pothole } from "../page";

// 1. Create a child component to handle map clicks
function LocationMarker({
  position,
  setPosition,
}: {
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
}) {
  // useMapEvents listens to map interactions
  useMapEvents({
    click(e) {
      // Log the exact coordinates to the browser console for debugging
      console.log("📍 Pin dropped at Lat:", e.latlng.lat, "Lng:", e.latlng.lng);

      // Update the state with the exact latitude and longitude clicked
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return (
    <Marker position={position}>
      <Popup>
        <strong className="text-red-600">Selected Location</strong> <br />
        Ready to report a pothole here.
      </Popup>
    </Marker>
  );
}


const potholeIcon = L.divIcon({
  className: "",
  html: '<div style="width:16px;height:16px;background:#dc2626;border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.45)"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -10],
});

type MapAreaProps = {
  markerPosition: [number, number];
  setMarkerPosition: (pos: [number, number]) => void;
  potholes: Pothole[];
};

export default function MapArea({ markerPosition, setMarkerPosition, potholes }: MapAreaProps) {

  // Fix for Next.js missing Leaflet marker icons
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <div className="w-full h-full relative z-0">
      {/* A little floating UI to show the user the live coordinates */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] bg-white px-4 py-2 rounded-full shadow-md border border-slate-200 pointer-events-none">
        <p className="text-xs font-mono text-slate-700">
          Lat: {markerPosition[0].toFixed(4)} | Lng:{" "}
          {markerPosition[1].toFixed(4)}
        </p>
      </div>

      <MapContainer
        center={[40.7128, -74.006]} // Initial map center
        zoom={13}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Interactive marker for selecting a location to report */}
        <LocationMarker
          position={markerPosition}
          setPosition={setMarkerPosition}
        />

        {/* One red dot for every reported pothole */}
        {potholes.map((p) => (
          <Marker key={p.id} position={[p.latitude, p.longitude]} icon={potholeIcon}>
            <Popup>
              <strong className="text-red-600">Reported Pothole</strong>
              {p.location_description && (
                <><br />{p.location_description}</>
              )}
              <br />
              <span className="text-slate-500 text-xs">
                Reported {p.occurrences} time{p.occurrences !== 1 ? "s" : ""}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
