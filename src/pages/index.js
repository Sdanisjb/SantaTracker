import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import L, { TileLayer } from "leaflet";
import { Polyline as WrappedPolyline } from "leaflet.antimeridian/src/vector/Wrapped.Polyline";
import { Marker, useMap } from "react-leaflet";
import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";
import Snippet from "components/Snippet";

const LOCATION = {
	lat: 38.9072,
	lng: -77.0369,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 1;

/**
 * MapEffect
 * @description This is an example of creating an effect used to zoom in and set a popup on load
 */

const MapEffect = ({ markerRef }) => {
	const map = useMap();

	useEffect(() => {
		if (!markerRef && !map) return;
		let route, routeJson;
		async function fetchData() {
			try {
				route = await fetch(
					"https://firebasestorage.googleapis.com/v0/b/santa-tracker-firebase.appspot.com/o/route%2Fsanta_en.json?alt=media&2018b"
				);
				routeJson = await route.json();
			} catch (e) {
				console.log(`Failed to find Santa!: ${e}`);
			}
			console.log("routeJson", routeJson);

			const { destinations = [] } = routeJson || {};
			console.log("Destinations", destinations);
			const destinationsVisited = destinations.filter(
				({ arrival }) => arrival < Date.now()
			);
			const destinationsWithPresents = destinationsVisited.filter(
				({ presentsDelivered }) => presentsDelivered > 0
			);
			const lastKnownDestination =
				destinationsWithPresents[destinationsWithPresents.length - 1];

			//Importamos el estilo de la API de mapbox para nuestro mapa

			//Agregamos los iconos de regalos para cada parada de Papa Noel
			destinationsWithPresents.map((destination) => {
				const { location } = destination;
				const { lat, lng } = location;
				const markLatLong = new L.LatLng(lat, lng);
				const presentMarker = L.marker(markLatLong, {
					icon: L.divIcon({
						className: "icon",
						html: `<div class="icon-present">🎁</div>`,
						iconSize: 5,
					}),
				});
				presentMarker.addTo(map);
				presentMarker.bindPopup(
					"Se entregaron " + destination.presentsDelivered + " regalos"
				);
			});

			if (destinationsWithPresents.length === 0) {
				// Create a Leaflet Market instance using Santa's LatLng location
				const center = new L.LatLng(0, 0);
				const noSanta = L.marker(center, {
					icon: L.divIcon({
						className: "icon",
						html: `<div class="icon-santa">🎅</div>`,
						iconSize: 20,
					}),
				});
				noSanta.addTo(map);
				noSanta.bindPopup("Papa Noel sigue en el Polo Norte");
				noSanta.openPopup();
				return;
			}
			const santaLocation = new L.LatLng(
				lastKnownDestination.location.lat,
				lastKnownDestination.location.lng
			);

			const santaMarker = L.marker(santaLocation, {
				icon: L.divIcon({
					className: "icon",
					html: `<div class="icon-santa">🎅</div>`,
					iconSize: 20,
				}),
			});

			santaMarker.addTo(map);

			// Create a set of LatLng coordinates that make up Santa's route

			const santasRouteLatLngs = destinationsWithPresents.map((destination) => {
				const { location } = destination;
				const { lat, lng } = location;
				return new L.LatLng(lat, lng);
			});

			// Utilize Leaflet's Polyline to add the route to the map

			const santasRoute = new WrappedPolyline(santasRouteLatLngs, {
				weight: 2,
				color: "green",
				opacity: 1,
				fillColor: "green",
				fillOpacity: 0.5,
			});

			// Add Santa to the map!

			santasRoute.addTo(map);
		}

		fetchData();

		return;
	}, [map, markerRef]);

	return null;
};

const IndexPage = () => {
	const markerRef = useRef();

	const mapSettings = {
		center: CENTER,
		defaultBaseMap: "mapbox",
		zoom: DEFAULT_ZOOM,
	};

	return (
		<Layout pageName="home">
			<Helmet>
				<title>Rastreador de Papá Noel</title>
			</Helmet>

			<Map {...mapSettings}>
				<MapEffect markerRef={markerRef} />
			</Map>

			<Container type="content" className="text-center home-start">
				<h2>¿Quieres crear algo parecido?</h2>
				<p>Ejecuta este código en tu terminal</p>
				<Snippet>
					gatsby new [directory]
					https://github.com/colbyfayock/gatsby-starter-leaflet
				</Snippet>
				<p className="note">
					Note: Gatsby CLI required globally for the above command
				</p>
			</Container>
		</Layout>
	);
};

export default IndexPage;
