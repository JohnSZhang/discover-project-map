
document.addEventListener("DOMContentLoaded", function () {
    var map, current_position, radius, art_locations, myIcon, museumIcon, self_loc, locationControl, mapLoaded;

    mapLoaded = false;
    myIcon = L.icon({
        iconUrl: "https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-512.png",
        iconSize: [40, 40],
        iconAnchor: [22, 40],
        popupAnchor: [-3, -30],
        shadowSize: [68, 50],
        shadowAnchor: [22, 94]
    });

    museumIcon = L.icon({
        iconUrl: 'https://image.flaticon.com/icons/png/512/236/236981.png',
        iconSize: [40, 40],
        iconAnchor: [22, 40],
        popupAnchor: [-3, -30],
        shadowSize: [68, 50],
        shadowAnchor: [22, 94]
    });

    galleryIcon = L.icon({
        iconUrl: 'https://icon-icons.com/icons2/1261/PNG/512/1496676744-rounded-high-ultra-colour15-palette_84629.png',
        iconSize: [40, 40],
        iconAnchor: [22, 40],
        popupAnchor: [-3, -30],
        shadowSize: [68, 50],
        shadowAnchor: [22, 94]
    });

    statueIcon = L.icon({
        iconUrl: "https://www.shareicon.net/download/2016/08/18/810088_chile_512x512.png",
        iconSize: [40, 40],
        iconAnchor: [22, 40],
        popupAnchor: [-3, -30],
        shadowSize: [68, 50],
        shadowAnchor: [22, 94]
    });

    muralIcon = L.icon({
        iconUrl: "https://cdn0.iconfinder.com/data/icons/seo-internet-1/512/graffiti_paint_wall_spray_street_can-512.png",
        iconSize: [40, 40],
        iconAnchor: [22, 40],
        popupAnchor: [-3, -30],
        shadowSize: [68, 50],
        shadowAnchor: [22, 94]
    });


    art_locations = {
        data: [
            {
                name: "High Museum of Art",
                loc: {lat: 33.7900674, lng: -84.38560339999999 },
                type: "museum",
                address: "1280 Peachtree St NW, Atlanta, GA 30309",
                website: "https://www.high.org/",
                img_url: "http://res.cloudinary.com/atlanta/image/upload/w_747/ACVBLeisure/uploadedImages/Photogallery/Atlanta-High-Museum-of-Art-Exterior-Dusk.jpg"
            },
            {
                name: "Besharat Gallery",
                loc: {lat : 33.7498241, lng: -84.39935009999999},
                type: "gallery",
                address: "175 Peters St SW, Atlanta, GA 30313",
                website: "https://www.besharatgallery.com/",
                img_url: "https://cdn.theculturetrip.com/wp-content/uploads/2014/03/3975924696_16d728cbac_b.jpg"
            },
            {
                name: "Atlanta from the Ashes",
                loc: {"lat" : 33.7546542, "lng" : -84.38928079999999 },
                type: "statue",
                address: "Atlanta, GA 30303",
                website: "https://en.wikipedia.org/wiki/Atlanta_from_the_Ashes_(The_Phoenix)",
                img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6aF9VzPmhoxxZhYwOOS_u4lEsnev_4l2i_hDL2JVWl9kaVBwq1w"
            },
            {
                name: "Peace Monument",
                loc: {"lat" : 33.7864776, "lng" : -84.3774639},
                type: "statue",
                address: "Piedmont Ave NE, Atlanta, GA 30309",
                website: "https://www.aoc.gov/capitol-grounds/peace-monument",
                img_url: "https://4.bp.blogspot.com/-NT11dMX9evU/VvAQHbgQyWI/AAAAAAABLUQ/c0vZ6H4a_Kgm_XLdY0WMVixAi0PRhgO1w/s1600/Cease%2BFiring%2B-%2BPeace%2Bis%2BProclaimed.jpg"
            },
            {
                name: "HENSE & Living Walls 2014",
                loc: {"lat" : 33.7581213, "lng" : -84.39225999999999},
                type: "street_art",
                address: "135 Walton Street NW, Atlanta",
                website: "https://www.livingwallsatl.com/artists/",
                img_url: "https://s-media-cache-ak0.pinimg.com/originals/d3/b8/54/d3b85492033360c2d98fbd3be108dcfe.jpg"
            },
            {
                name: "Krog Street Tunnel",
                loc: {"lat" : 33.7534873, "lng" : -84.3638849},
                type: "street_art",
                address: "1 Krog St NE, Atlanta, GA 30307",
                website: "https://www.atlanta.net/things-to-do/krog-street-tunnel/",
                img_url: "https://www.atlantaphotos.com/media/catalog/product/cache/1/image/0dc2d03fe217f8c83829496872af24a0/G/P/GP_KrogStreetTunnel_2017_05.jpg"
            },
            {
                name: "Paris On Ponce",
                loc: {"lat" : 33.7738023, "lng" : -84.3642261},
                type: "street_art",
                address: "716 Ponce De Leon Pl NE, Atlanta, GA 30306",
                website: "https://parisonponce.com/",
                img_url: "https://res.cloudinary.com/mommy-nearest/image/upload/c_fill,h_450,w_800/r0vc68kmnbcw5tis7tnp.jpg"
            },
            {
                name: "Atlanta Mural",
                loc: {"lat" : 33.7616569, "lng" : -84.3965235},
                type: "street_art",
                address: "300 Marietta St, Atlanta",
                website: "http://buckheadmurals.com//",
                img_url: "https://res.cloudinary.com/mommy-nearest/image/upload/c_fill,h_450,w_800/g7ftxd1zqmyaei93lco1.jpg"
            },
            {
                name: "Museum of Design Atlanta",
                loc: {"lat" : 33.7907143, "lng" : -84.38454970000001},
                type: "museum",
                address: "1315 Peachtree St NW, Atlanta, GA 30309",
                website: "https://www.museumofdesign.org/",
                img_url: "https://static1.squarespace.com/static/52128b5ce4b0750ce7ea474b/t/527af62de4b0982aa4ac1cb8/1383790126661/DSC_8120.jpg"
            },
            {
                name: "Alan Avery Art Company",
                loc: {"lat" : 33.8289162, "lng" : -84.36565050000002},
                type: "gallery",
                address: "656 Miami Cir NE, Atlanta, GA 30324",
                website: "https://www.alanaveryartcompany.com/",
                img_url: "http://jenniferjljones.com/wp-content/uploads/2012/10/alanaveryartco-installation-landscape-640x335.jpg"
            },
            {
                name: "Get This! Gallery",
                loc: {"lat" : 33.7829737, "lng" : -84.3680308},
                type: "gallery",
                address: "1037 Monroe Dr NE, Atlanta, GA 30306",
                website: "https://getthisgallery.com/",
                img_url: "http://getthisgallery.com/images/uploads/exhibitions/HK.jpg"
            },
            {
                name: "TWIN KITTENS",
                loc: {"lat" : 33.7823141, "lng" : -84.411745},
                type: "gallery",
                address: "1016 Howell Mill Rd, Atlanta, GA 30318",
                website: "cargocollective.com/twinkittens",
                img_url: "https://scontent-atl3-1.xx.fbcdn.net/v/t31.0-8/1015063_10151508601257950_460666233_o.jpg?oh=46b4c9c1c7ce620dbd813fa474eef587&oe=5B1FE9FA"
            },
            {
                name: "Mason Murer Fine Art",
                loc: {"lat" : 33.8104807, "lng" : -84.37624799999999},
                type: "gallery",
                address: "415 Plasters Ave NE Suite 100, Atlanta, GA 30324",
                website: "https://masonfineartandevents.com/",
                img_url: "http://burnaway.org/wp-content/uploads/2014/08/1401939_178334905700296_1294326930_o.jpg"
            }
        ]
    }

    map = L.map('map');

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2hpbWlueiIsImEiOiJjamN4cmo0YTgwdW1lMzRuc2FoOHo3YzF1In0.ReH73GOvfm7NCAZmSoDIWg', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(map);

    function displayGalleryNearby(current_latlng) {
        arts = art_locations.data;
        for (let i = 0; i < arts.length; i++) {
            art = arts[i];
            let iconType;
            switch (art.type){
                case "gallery":
                    iconType = galleryIcon;
                    break;
                case "museum":
                    iconType = museumIcon;
                    break;
                case "statue":
                    iconType = statueIcon;
                    break;
                case "street_art":
                    iconType = muralIcon;
                    break;
            }
            let m = L.marker(arts[i].loc, {icon: iconType})
            m.addTo(map);
            m.bindPopup(
                '<h3>' + art.name + '</h3>' +
                ' <img width="150" class="popup-img" src="' + art.img_url + '" />' +
                '<p>' + art.address + '</p>' +
                '<a href=' + art.website + ' target="_blank" >website</a>' + '</break> <a href="' +
                'https://www.google.es/maps/dir/?api=1&origin=' + self_loc.lat + ',' + self_loc.lng + '&destination=' + art.loc.lat + ',' + art.loc.lng + '&travelmode=bicycling" target="_blank">directions</a>');
        }
    }


    function onLocationFound(e) {
        if (current_position) {
            map.removeLayer(current_position);
        };

        current_position = L.marker(e.latlng,
            {icon: myIcon}).addTo(map);

        self_loc = e.latlng;
        if (!mapLoaded) {
            displayGalleryNearby(e.latlng);
        }

        mapLoaded = true;
        console.log('found location');
    }

    function onLocationError(e) {
        console.log(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    function locate() {
        map.locate({setView: true, maxZoom: 15, minZoom: 15});
    }

    locate();

    LocationControl =  L.Control.extend({
        options: {
            position: 'topleft'
        },

        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom cursor');

            container.style.backgroundColor = 'white';
            container.style.backgroundImage =   "url(https://png.pngtree.com/element_pic/00/16/07/2557961e461681d.jpg)";
            container.style.backgroundSize = "27px 27px";
            container.style.width = '27px';
            container.style.height = '27px';

            container.onclick = function () {
                locate();
            };

            return container;
        }
    });
    map.addControl(new LocationControl());
    L.tileLayer.provider('Stamen.Watercolor').addTo(map);
});
