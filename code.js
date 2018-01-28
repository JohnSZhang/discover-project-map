var walk_source, bike_source, train_source, car_source, site_source;

document.addEventListener("DOMContentLoaded", function () {
    var map, current_position, radius, art_locations, myIcon, museumIcon, self_loc, locationControl, mapLoaded, popup_text, trasport_list;

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
                website: "http://cargocollective.com/twinkittens",
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

            popup_text = '';
            transport_list = [
                { method: 'walking', source: walk_source},
                { method: 'bicycling', source: bike_source},
                { method: 'transit', source: train_source},
                { method: 'driving', source: car_source}
            ];

            //add webpage
            popup_text += '<a href="' + art.website + '" target="blank"><img src="' + site_source + '"/>' + art.name + '</a>';

            //add image
            popup_text +=  '<img width="150" class="popup-img" src="' + art.img_url + '" />';

            //add trasportations
            popup_text += '<div class="direction-modes">';
            for (let j = 0; j < transport_list.length; j++) {
                transport = transport_list[j];
                popup_text += '<a class="transport" href="' +
                'https://www.google.es/maps/dir/?api=1&origin=' + self_loc.lat + ',' + self_loc.lng + '&destination=' + art.loc.lat + ',' + art.loc.lng + '&travelmode=' + transport.method + '" target="_blank">' +
                '<img src ="' + transport.source + '"/></a>';
            }
            popup_text += '</div>'


            m.bindPopup(popup_text);
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

walk_source = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAURSURBVGhD7ZhbbNtUGIDDGOW+B0QlEAJpvPAE4iKGBIJpmtgmageKqLi8MKRJk0BsQ2Lsgabu2OjGmrZ0WWEN6+i0riVpnMRJ66Rd21CWpnbjpBelG6JI8MS0cXkYu2m0Pvx2fyd26o3xkMSV8km/lPj85/h8Oef4nNhWpkyZ0kP6qh6VI7Rb5umEzFPdcj/9AhYtH6DzT0BcJBGaaCFHqAWZt7+FKcsDGIERvURWhqf+kD1v3Ilp1oYwzAr49S+biSghR6vWYKr1gbVx1kxCCTlifwzTrA+MSIu5BH0KU5YH8sDLd8N66DNI8PSUPECvxpTlBcish9HZJvNV1cRbU4GXyxSNaGfrOrbjG3dPe9fw8faehMOZWs8wZAUWWx/+eOuqrsOeWcaZJnXOSTXcbWHt8wTjlO7HVOsy0HnoJZcrelET0EInQvY0jp7HdGsS7mivb2hOyHoBJVyuQaIfHSXcLV1PYjXrQGJrV44ca+LyO6vE/pYx0nJweMn1rw5868Hq1oD0vfKAcpa61v86aXNFsx2tb0qRo18HSEOzYBBQovZAmuyt95zDJkoPCDyrP378yb1L9rUkiPtQ+HfXwYHT+QJa7NwjkS0fjZJAW9vD2FRpgc1NMO7W1NzPvu2bGSZ2R11j+qqZhBLbHCLZvD1OOhrbDmNTpYOEqLvgmPGPTuIzbbd2NKXXmglosfWTcVXk8/qes2pjpUSOvvp8ToK+oj9yQGc/ze98LtILm3eMkf27u8mZEx9ck/lNq7BaaYDO79CJJPCyCkyrqLkEPAScycnTXe/L2boRaitWKw0wlbpzItSXeNlW4/XeCr/6BTMJJRyN6b2QH9TqYv1BOWpfh00UF7j5XK4juf/ezBfTT5sJaME0pTYpndaLZNuJUOPQLnyx3YLNFRY5uuE+mE7Z6aG8IcEiW+uRCefuZnOJusbJeaZVUNeE3E+9CR2f1YtoAW2n5HDVQ2qDhQR+tQ3Zm0Zow7lpaFD8a3JCJMNDSfKdTyKuIymiiTmc6RSmqSz+n7fboeM/6EUW26V2YlrhAJGPczekQ3hZZeikcHVGEok+NLHOE6kgpi1BeQkB7bIgsABiV4ryUoIMVD0DApfgpvOkn3oNL9u8Xu89odD3C/kiWpwaFY9i6nWRI9UPwh5VvGM+PP8rYS8xHDHCLFvN+QNkdEQwFZlOin9nJOkRTLcuIZbtDPlZEgoEiRAfN5WB8GG6NWFg4Yb8vnOqCATPBcmUmDATIVOSuBGrWY9gsPc5TUKLk3xffCYpXFoikxR/Am7HqtYCplVDvkjY59sI6+Kd6aQgm8g4sKq1CLG+GYMIy/5ICFF3aJCpXSIiiZenBMFaL+iCvb1PGSQgOJb9EIttihCMSpeJzHX3laLDezyVMBq/GERY3wVlT8EUlUwmUwHTaTxfZloSXsSU0gGdrYCOxw0SqgjbgCkG0ul0JYzMbwYZkNOmYMng/L5jJhJjiiCmLAHWyxaDyGLUYHHxgTWwK1+C87O/KlMNU0yJxWIrQWZWLwLf5yRJug1TikeQZe3Q8XmDCKyLQCDwOKbckKnUBK0XUSMpZh8ORYHjPKuVThskQEqRw5SbAjbKUaOIcD6TiRkeEAUFjiG1eRLKo3YXFt80k8nkGpONshqLCw/n733bIAELHov+NyDi0SQUqYwoFu99sPKohFFhONaXgJHYd6Mn1H9xJh6/F6aUW91fUuPv4eUyZcoUBJvtX6xZxiikflTrAAAAAElFTkSuQmCC";

car_source = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQ0SURBVGhD7VdLbBtVFA0fobJELBCCSGlA5SOVSpDasR1nXDstScbzce1J4vG4ThEkTeoGAWkUlAINbUlpQJhSQKiFkFDa0NSeAAWVwIoNiA2Vitgg2NAFQqqUSpVQG5HLfZM3Y489rRJn8kNzpLNI7rvn3PPe+Hlc4cCBAwcOHDhw8D8Bq4pPsKqwP5wTDy+U2NfHfc7dQ6VWDmw2simsCtfDqgjlU/iby0aCVHJlgEP06gOFRhvB9brXRE/Gr9XYrFBSI2zAHq0/J86wkzxPZZcfOEC/HsR3lIH7dlSZ+ED6Ya3WPMGV1Ajvb18PnrdoWFW4tmIns9ggGlNV4H6zTluHJ3yZPbu9msovH2wJQohhfMcCepgLsc9id1KL5YFtQZCVO6vznxlVyFCL5YGdQQiruzdoa1F3FsOEqM3Sw+4ghJteqdF6MMif7Dn2Lmq1tFiKIOTzEji+Vetjc+IYtVo4BFWoIjfHvJiNHNGD+N8LwvpdD5n4yN7HtFrTBF9SuxlJH5sTtEeMfL+QmcScePeCLgE80ml9uNVIPKW/MOD3OOdrqa96om/8pFbS0c1oHW++0naaBZ7siIXQamLHVD988/s/MHbxl0uZH8+naYQ5XA3dPgv+CrjcuA5axsOWAquFJMi3f8wY/ODnHy7SGPkghOnjQUuB1cLiIOd+m56lMdZWkJYv28nwaz8IoTApQfQLhVK+QmPcOAg3zoPU3wDxuB8Sog/iyXqIDuJ9j6/ohcK2cUKA2MtbIa4QPy/EE36IDTRA+MzN/IRpGsM6iHCChUTYA8mAu4Ryiw/4U3yR4OLIf8KBHPVZ+iUEL/AjN7qELILMBG6F5Kf4Eoc7kOC8lqI6yW7h3W4hXA4FkKU6Sx+dMj4R3FnL3nyQgbe9V/dlfPDMyNxrAjleXSAV9MDwC7th5MgBGNy10yQuHm0qEi2P24cbTboH00/Dx+h3+Lku/LvW+H/00LbS/px4icYo/WZva2eM5qFnO+G7MycN9ikxoyb12nMxtPQEDc2Bp2ST34Hu/Oa1djCl/TlxL42hBRHZXETSmWA9v+rN7w++aBIe6ukwhOOxuqnCvnLYnI10t8XrDL/h3rTJ79i+PsNPDnsvFPY2qcJGGsEaSsA9pjeTE5gaH9NEvz75IXTz2wzhJOPK78YioDCug7rmnkgTnD81ovlNnR6F51sFww/XvUtb5odEwMXqzbr4/s4UdLL5RyAZcM3IoRpbfmvL9bUbFcb9r67dxTVofrvFJwv83LBjy+Z62jJ/oPBkoUgxlYDrVbrUFuDpZqx8DDLuUbp0YUgxzDrc9Y9QZLZI8BryJVxyy9xKeyBJ0m24OUP4WF8v9KMn9Y4kPXoHXVoekqHNG1C8B4c/pGxxdyT8j99LS0uCdn9NJQ7fRfySTO0ehal9kJYcOHDgwIEDBw7WFioq/gN8XXX19aJZxgAAAABJRU5ErkJggg==";

train_source =
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAReSURBVGhD7VlpTBRnGB5qQH/4QzG2UWOaeEWbaj1j1Rir7m5EAi0aZXdoA2HWA03dxCtV7jYqXsQjwtJYEWU9am0qqGA8kKWAFxIVj6XlBz+a/jEmRo36Z16/d/ab2Znd2cjOzsyi4UmeMPne93sOWMKxTB8+Zljs2cPp43sRya5pSGZzBltZZ4vFwb2al5k5iB6HBe7gLt7Bu/S4d8Dq4O6TYEC4lh6FBe4Iu+QOPeo9iCRcJKVNh+zlArb0FbPpcQhwhjs9fRmaAr6MWcCXM5dF/rsn8b+2HSMAP8rP5Qy7Q7SorPng3QwLbgb0IGpRWePAN8R/yTf238k3JlQoeDXhJF8f79WFqBWsj57ehC9ojOjAe+MnEcE30NgfYkHi/Zq/Hj+RxtEO8pk5gIJvrw6EvYWpsMG13BSWFn0reNIy+2kc7SAiHhQryUuDcVO/NpW78r8Ti3hoHO0Qi6xemS6IT7dPgYU/T+gR5+dPkELhs3w20TpDmoUjehpWBEM4uz7rEbMeDJNC4bN8NoOdLM3C0dAiM7MnQXLFmB4x6eBYKRQ+y2dfLZ4mzcLR0CJm0pAixbnZYFvCmUr01L1Ia80vUHmq01SiZ1+RYIQr8tsJH5QfewzlVUr+Wv1EsadG3Am+h1qoKd8zvIj7+BPILbkDW7bfVuWesvuKQHLiTO0OEjUriLa4a3iRUneHahCRBbvapN1g4kztjsjSig5p1/Aie90PVEOIjKTIT9uUd1Fb3O3dRXa2QZarARal18Ds5D9gVtIZmJf6J6Rl1oErr+XDKHKYfDOn/nBBCK9GLLa+oEXaN6TIjdpCyUBrEVfu30LgOSRwRs5lcOW3wMaiG5CzuQmS2fPCbG7KWThU+UjYv1lboH+RrvqlUiCtRRY7aoWwWeuuhd4j3yu2ZeeE+abiVmG/61Ka/kWgcQA015QQA5/mIkn2GiHoqs1e1Xsp3/tfdhsKm4nXdsHTgCJ+vr0+FLrrvoGH59LC8nFtCjy9MjWE985YoO5IFjR5MkLudPy1BC4e5qChahk8rf9c8kMaUiQW1KdIddw+vvqTttgybh+Nox18OeNR+z+UmcQMNI52fLxFjg8HuLkR4PYWgFNjFYZREbVQE7XRQzbTv0jVpwDP2wHedPv50gdwerzCVBNR41VnQBc9qoZKc/2LNK0ImIlsLwoE0sr24lDdJqc017+Ilws1vEt+jRDnWnm3MFTXS/5ep3P9i1QOAXh2K2D24hHAiVGBQFp5crRfS9RFj8pEaa5/EeRRUqZ5NUDrOoDqkYHzaOkhP81RE7XRQzYzpkgMqE8RN/OjmriZJEXW0DjaAb8z/UiZvM7dQ7rxLbNg/rM78X9ipHh7LVKihpo2ehLvrQBMHI0TPayss4y+E6ukwxn1lx01VLWJJ13RDygaZOLnh1bEwnKHVIwMLYKedEU/LLRzi6ws5yOmXRJZrtPGcul0RTMsdqcDtYK0fdaMbBtd6UMfYgOGeQdL06EQZ3nm6QAAAABJRU5ErkJggg==";

bike_source = "data:image/png;base64,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";

site_source = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAM1SURBVGhD7ZlbTxNBGIZJvNMr/4BRb/wdKluMuwW1OxKQiBhSD1ETINEYPB+CRmPiFTdq9MJINJqoIMixYgQlpArIwUQFE9ttoaVFQHr+nJkOWbbdtoYeWMI+yZtMd77Zfd/dnZ1Jmqejo7PGEQRhfUFR8ead/L6tWhBnFLdwXNkGZi81BqNJMAioHws0KR5Z83mxkNlVp0BAR3FxJG6wFsWLNcy2Evr4eNFPikwllXDpRj3cqW/QlK7dvgeozLwYJlhQKG5j9mU4Hp0nBfyeUrj/5C08beyF0e82KtJu7R6Eid9TYOkdgYZXPfBlZAJ+/HLAi+Y++jtXetDQBvzeAyyMeJ3Zl+EE9Ih0lpur6IDuT6OwyPu+MXC6Zmh7bt4HTR1W2iaQQLEXy7bKzdU0CPb8nNmXwa/VY9J5+PhpWvyytR9m5xeoSNs6NA7hcIQ9oY/g9syC3x+EFstA3IWyLeIxGkRsZPZlYoNoWf8VZFdhMQimMk2LeEwZZDUpaZAjJ2qgqblN0zpZfTZ1kHOX69j3SLvU3bqrB9EUGQ8SDIZYS0kkEoF5vP7MzaWvQCDIziqT0SAe7yz8HLeDBy+MsUx7/tC+TGh8QqI3ZikZDTI56aEXcjjc7IiMy+WNM5SOYp+8HkQNPcgytHJB3DNxZtJRKBRmZ46SsyA+XwDskgtstqm0RW5KLDkLkm30IGqsiSCBv3iODElgG7ArZP8qQdAnbznINkbC4xOJnHvB52fVMjkLQgwPvR5WlXNsklUBSJKbniOZnPg6seQsiG3QrjC/VI5RJ6uKft2m8JqTSGQ98md705iJIMtFD6JGJoJofrJLww6F+aVyfltFk518Yolhx4hTIXIs5Jc3gJqf7NkmaRCDID4knWdqr7Dy5KxkkItXb9Ig2PMzZl8GH6wlnUXoILjd02xIYlYqiNc7A6aSisUgF5h9mXwBbcIdC6SgwnwKWtstYP08mFBdlh5402KBjs4Pqv3ZUHvnO6g8VsVeK+Qj/3Ey+0o4IzqE50oomla7wh7D+YJYyWyrY9i9fztO26XFQNQTjyycUdzB7KYGIbSO50s3aknEE7Ono6OzNsnL+wdfwklcOyMnRAAAAABJRU5ErkJggg==";
