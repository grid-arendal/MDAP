$("#loader").show();

$(window).resize(function () {
  sizeLayerControl();
});

$("#about-btn").click(function () {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function () {
  map.fitBounds(GRID_10_sqkm.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});


$("#legend-btn").click(function () {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function () {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function () {

  return false;
});

$("#nav-btn").click(function () {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function () {

  return false;
});

$("#sidebar-hide-btn").click(function () {
  return false;
});



/* Basemap Layers */
// var heremap = L.tileLayer("http://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?app_id=PX6SlYxSsHCHftXe3mwW&app_code=4pSNtf-dSsuyZb2BAu7fMQ"
//   , {
//     styleId: 997
//   })

var OSM = L.tileLayer("http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
  , {
    attribution: '&copy; openstreetmap.org',
    maxZoom: 30,
  })



var arcgisOnline = new L.tileLayer(
  'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; arcgisonline.com',
    maxZoom: 30,
  });

//area1m boundary
var area1m_2 = new L.geoJson(null, {
  style: function (feature) {
    return {
      color: '#ffae42',
      fillColor:'#ffae42',
      fill: true,
      fillOpacity:0.5,
      opacity: 0.9,
      clickable: false,
      weight: 1,

    };
  },
  onEachFeature: function (feature, layer) {

    var content = "<table class='table table-striped table-bordered table-condensed'>";
    content = content + "<tr><td><b>Major Grid ID:</b></td>"
    content = content + "<td>" + feature.properties.major_id + "</td></tr>"
    content = content + "<table>";

    //popup the info window
    layer.on({
      click: function (e) {

        highlight.clearLayers().addLayer(L.polygon(layer.getLatLngs(), polyhighlightStyle));
        map_click_to_info(e);
      }
    });
    
   // layer.bindPopup(content);
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        area1m_2.resetStyle(e.target);
      }


    });

  }  ,
  layers:"geonode:area1m_2",
  version: '1.0.0'

});
$.getJSON("http://82.116.78.168/geoserver/wfs?srsName=EPSG%3A4326&typename=geonode%3Aarea1m_2&outputFormat=json&version=1.0.0&service=WFS&request=GetFeature&access_token=R6Yx192Iks148W06DcL2VLZSpRZnYM", function (data) {
  area1m_2.addData(data);
});


//GRID_10_sqkm boundary
var grid_10_sqkm_1 = new L.geoJson(null, {
  style: function (feature) {
    return {
      color: '#00A4AB',
      fillColor:'#00E5EE',
      fill: true,
      fillOpacity:0.1,
      opacity: 0.9,
      clickable: true,
      weight: 1,

    };
  },
  onEachFeature: function (feature, layer) {

    var content = "<table class='table table-striped table-bordered table-condensed'>";
    content = content + "<tr><td><b>Major Grid ID:</b></td>"
    content = content + "<td>" + feature.properties.major_id + "</td></tr>"
    content = content + "<table>";

    //popup the info window
    layer.on({
      click: function (e) {

        highlight.clearLayers().addLayer(L.polygon(layer.getLatLngs(), polyhighlightStyle));
        map_click_to_info(e);
      }
    });
   
    //layer.bindPopup(content);
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        grid_10_sqkm_1.resetStyle(e.target);
      }


    });

  },
  layers:"geonode:grid_10_sqkm_1",
  version: '1.0.0'


});
$.getJSON("http://82.116.78.168/geoserver/wfs?srsName=EPSG%3A4326&typename=geonode%3Agrid_10_sqkm_1&outputFormat=json&version=1.0.0&service=WFS&request=GetFeature&access_token=R6Yx192Iks148W06DcL2VLZSpRZnYM", function (data) {
  grid_10_sqkm_1.addData(data);
});



//GRID_1_sqkm boundary
var grid_1_sqkm_1 = new L.geoJson(null, {
  style: function (feature) {
    return {
      color: '#00A4AB',
      fillColor:'#00E5EE',
      fill: true,
      fillOpacity:0.1,
      opacity: 0.9,
      clickable: true,
      weight: 1,

    };
  },
  onEachFeature: function (feature, layer) {

    var content = "<table class='table table-striped table-bordered table-condensed'>";
    content = content + "<tr><td><b>Minor Grid ID:</b></td>"
    content = content + "<td>" + feature.properties.uni_value + "</td></tr>"
    content = content + "<table>";

    //popup the info window
    layer.on({
      click: function (e) {

       highlight.clearLayers().addLayer(L.polygon(layer.getLatLngs(), polyhighlightStyle));
       map_click_to_info(e);
        
      }
    });
    
    //layer.bindPopup(content);
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        grid_1_sqkm_1.resetStyle(e.target);
      }


    });

  },
  layers:"geonode:grid_1_sqkm_1",
  version: '1.0.0'

});
$.getJSON("http://82.116.78.168/geoserver/wfs?srsName=EPSG%3A4326&typename=geonode%3Agrid_1_sqkm_1&outputFormat=json&version=1.0.0&service=WFS&request=GetFeature&access_token=R6Yx192Iks148W06DcL2VLZSpRZnYM", function (data) {
  grid_1_sqkm_1.addData(data);
});



//polygon highlight
var polyhighlightStyle = {

  weight: 6,
  color: "#00FFFF",
  opacity: 1,
  dashArray: '2,2',
  lineJoin: 'round'
};

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 1,
  radius: 5
};


//COASTLINE
var best_coastline_lofoten = L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:best_coastline_lofoten',
  format: 'image/png',
  transparent: true,
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
  opacity:'0.7'
});


//CURVATURE
var merged_50 = L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:merged_50',
  format: 'image/png',
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
  transparent: true,
});

var merged_500 = L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:merged_500',
  format: 'image/png',
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
  transparent: true,
});

var merged_1000 = L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:merged_1000',
  format: 'image/png',
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
  transparent: true,
});


var merged_10000 = L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:merged_10000',
  format: 'image/png',
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
  transparent: true,
});


var merged_50000 = L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:merged_50000',
  format: 'image/png',
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
  transparent: true,
});

var loften_substrategcs=  L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:loften_substrategcs',
  format: 'image/png',
  transparent: true,
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
});


//var loften_sentinel2 = L.tileLayer.wms("http://tuvalu.grida.no/arcgis/services/madplan/madplan_sentinel2/MapServer/WMSServer", {
//  layers: '0',
 // format: 'image/png',
  //transparent: true,
  //version: '1.0.0',
  //attribution: "geonode.grida.no",
  //title: true,
 // opacity:'1'
  
//});

var loften_sentinel2=  L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:loften_scaled',
  format: 'image/png',
  transparent: true,
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
});

var Fetch_2017 =  L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:Fetch_2017',
  format: 'image/png',
  transparent: true,
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
});

var Fetch_2017_as_REI =  L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:Fetch_2017_as_REI',
  format: 'image/png',
  transparent: true,
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
});

var Fetch_1987_2017 =  L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:Fetch_1987_2017',
  format: 'image/png',
  transparent: true,
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
});



var Fetch_1987_2017_as_REI =  L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:Fetch_1987_2017_as_REI',
  format: 'image/png',
  transparent: true,
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
});


var population_nordland =  L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:population_nordland',
  format: 'image/png',
  transparent: true,
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
});

var elv_lofoten =  L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:elv_lofoten',
  format: 'image/png',
  transparent: true,
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
});

var catchement_lofoten =  L.tileLayer.wms("http://82.116.78.168/geoserver/geonode/ows", {
  layers: 'geonode:catchement_lofoten',
  format: 'image/png',
  transparent: true,
  version: '1.0.0',
  attribution: "geonode.grida.no",
  title: true,
});




//add the map control and center it

map = L.map('map', {
  zoom: 20,
  center: [68.264847, 14.336944],
    "Aerial Imagery": arcgisOnline,
  layers: [arcgisOnline, grid_10_sqkm_1, highlight],
  zoomControl: false,
  attributionControl: false
});




/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function (index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
//map.on("layeradd", updateAttribution);
//map.on("layerremove", updateAttribution);


var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'><a href='http://www.grida.no/' target='_blank'>GRID-Arenda</a> | </span>";
  return div;
};




map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

//add print option in map
var printer = L.easyPrint({
  sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
  filename: 'myMap',
  exportOnly: true,
  hideControlContainer: true,
  position: 'bottomright',
}).addTo(map);






L.control.scale({ maxWidth: 200, position: 'bottomleft' }).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
// if (document.body.clientWidth <= 767) {
//  var isCollapsed = true;
// } else {
//  var isCollapsed = false;
// }




var baseMaps = [{
  groupName: "Base Maps",
  expanded: true,
  layers: {
    "Aerial Imagery": arcgisOnline,
    "OpenStreetMap": OSM

  }
}
];



var overlays = [
  {
    groupName: "Grid cells",
    expanded: true,
    layers: {
      "Grid cells 10 Sq. Km.": grid_10_sqkm_1,
      "Grid cells 1 Sq. Km.": grid_1_sqkm_1
    }
  },
    {
    groupName: "Other layers",
    expanded: false,
    layers: {
      "1 meter DEM available": area1m_2,
      "Best coastline": best_coastline_lofoten
     }
  }, {
    groupName: "Curvature",
    expanded: false,
    layers: {
      "50 m curvature analysis": merged_50,
      "500 m curvature analysis": merged_500,
      "1000 m curvature analysis": merged_1000,
      "10000 m curvature analysis": merged_10000,
      "50000 m curvature analysis": merged_50000,
     }
  },  {
    groupName: "Fetch",
    expanded: true,
    layers: {
      "Fetch 2017": Fetch_2017,
      "Fetch 2017 as REI": Fetch_2017_as_REI,
      "Fetch 1987 - 2017": Fetch_1987_2017,
      "Fetch 1987 - 2017 as REI":Fetch_1987_2017_as_REI,

     }
  },  {
    groupName: "Land based pollution",
    expanded: false,
    layers: {
      "catchment areas": catchement_lofoten,
      "total population": population_nordland,
      "rivers and streams": elv_lofoten,
     }
  },
  
  
  
  {
    groupName: "Substrate",
    expanded: false,
    layers: {
      "Sentinel-II Imagery": loften_sentinel2,
      "Substrate 100m Buffer from Coast": loften_substrategcs,

     }
  },
];




/* Add legend */
var options = {
  container_width: "250px",
  group_maxHeight: "180px",
  container_maxHeight: "350px",
  exclusive: false,
  collapsed: false
};

var control = L.Control.styledLayerControl(baseMaps, overlays, options);
map.addControl(control);




//controlling the legend size /popup
function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);

  if (($("#navcol").is(":visible"))) {

    map.removeControl(control);
    control.options.collapsed = false;
    map.addControl(control);
  }
  else {
    map.removeControl(control);
    control.options.collapsed = true;
    map.addControl(control);

  }
}


/* Load the content before map load */
$(document).one("ajaxStop", function () {
$("#loader").hide();
  /* Fit map to GRID_10_sqkm bounds */
  map.fitBounds(grid_10_sqkm_1.getBounds());

});

//map click event
map.on("click", function(e) { map_click_to_info(e)  });

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
    .disableClickPropagation(container)
    .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
