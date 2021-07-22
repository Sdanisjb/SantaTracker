export const mapServices = [
	{
		name: "OpenStreetMap",
		attribution:
			'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
	},
	{
		name: "BlueMarble",
		attribution: "&copy; NASA Blue Marble, image service by OpenGeo",
		url: "https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg",
	},
	{
		name: "mapbox",
		attribution: "copy; BookMap",
		url: "https://api.mapbox.com/styles/v1/sdanisjb/ckrf1ze7c2d4t19ogf2m9gdbd/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2RhbmlzamIiLCJhIjoiY2tyZjF6NGU1NXMyazJ2bzh5Z2V0cmhxZSJ9.ntt0jslc5wt-jXtSnFHO5Q",
	},
];
