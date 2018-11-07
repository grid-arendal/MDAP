/* Clear feature highlight when map is clicked */
//create a layer attribute list

var layer_GetAttList = {
  "grid_10_sqkm_1": {
    major_id: "Major ID"
  },
  "grid_1_sqkm_1": {
    uni_value:"Minor ID"
  },
  "merged_50": {
    O_r_C_S:"O_r_C_S"
  },
  "merged_500": {
    O_r_C_S:"O_r_C_S"
  },
  "merged_1000": {
    O_r_C_S:"O_r_C_S"
  },
  "merged_10000": {
    total:"total"
  },
  "merged_50000": {
    total:"total"
  }, 
  "Fetch_2017": {
  GRAY_INDEX:"Value"
  },
  "Fetch_2017_as_REI": {
    GRAY_INDEX:"Value"
  },
  "Fetch_1987_2017": {
    GRAY_INDEX:"Value"
  },
  "Fetch_1987_2017_as_REI": {
    GRAY_INDEX:"Value"
  },
  "population_nordland": {
    popTot:"Population",
    statistikk:"Year"
  },  
  "loften_substrategcs": {
    discrip:"Description",
  },
  
}
//make a available layer list 
var layer_dictionary = [];
//get the layer name from the attribute list
var LayerName_keys = Object.keys(layer_GetAttList);
var Layer_atti_ref = Object.values(layer_GetAttList);
var keyVal;
var attri_ref;
  overlays.forEach(objLay => {

    for (keyObj in objLay.layers) {
      keyVal = objLay.layers[keyObj];
      

      if ((LayerName_keys.indexOf(keyVal.options.layers.split(":")[1]) > -1)) {
       
        //arranging the object with layer, layername,attibute ref
        attri_ref = Layer_atti_ref[LayerName_keys.indexOf(keyVal.options.layers.split(":")[1])];

        layer_dictionary.push({
          key: keyObj,
          value: keyVal,
          cus_att:attri_ref
        });

      }

    }

  });

var layer_attribute_active = [];
function map_click_to_info(eloc)
{
  
  highlight.clearLayers();
  layer_attribute_active = [];

  //loop through the layer active on map window
  for (keyObj in layer_dictionary) {
    if(map.hasLayer(layer_dictionary[keyObj].value))
    {
      //layer_dictionary_active.push(layer_dictionary[keyObj]);
      var url = getFeatureInfoUrl(map, layer_dictionary[keyObj].value, eloc.latlng, {
        'info_format': 'application/json',
  
      });

        url_ajax_query(url,layer_dictionary[keyObj].key,layer_dictionary[keyObj].cus_att)


  
    }
  }

  //build a info window and popup
  if(layer_attribute_active.length > 0)
  {
  var content = "<table class='table table-bordered table-condensed background-color: blue'>";
  layer_attribute_active.forEach(objLay => {
  
    
     content = content + "<thead class='bg-primary' ><tr ><th colspan='4'> Layer: " + objLay.lay_nam + "</th></tr></thead> <tbody>";

    $.each(objLay.attr_ref, function (key, value) {
      //console.log(key, value);

      content = content + "<tr class='bg-info'><td><b>" + value + "</b></td><td>" + objLay.wms_data.features[0].properties[key] + "</td></tr>"


    });



  });
  content = content + "</tbody><table>";
  L.popup({ maxWidth: 800 }).setLatLng(eloc.latlng).setContent(content).openOn(map);
  highlight.clearLayers().addLayer(L.circleMarker(eloc.latlng, highlightStyle));
}

}

//ajax query

function url_ajax_query(url,lay_nam,attr_ref)
{

      // Write ajex query to retrive data from wms layer
      $.ajax({
        url: url,
        async: false,
        dataType: 'json',
  
        success: function (data) {
  
          if (data.features.length > 0) {
          
            layer_attribute_active.push({wms_data:data,lay_nam:lay_nam,attr_ref:attr_ref});
            

          }
          else {
           // $("#loading").hide();
          }
        }, error: function (xhr, status, error) {
          console.log(error);
          $("#loading").hide();
        }
      });

}




//Functions will build a url for ajax query

function mapPolygon(poly) {
    return poly.map(function (line) {
      return mapLineString(line);
    });
  }
  
  function mapLineString(line) {
    return line.map(function (d) {
      return [d[1], d[0]];
    });
  }
  
  function getFeatureInfoUrl(map, layer, latlng, params) {
  
  
    var point = map.latLngToContainerPoint(latlng, map.getZoom()),
      size = map.getSize();
  
  
    var defaultParams = {
      request: 'GetFeatureInfo',
      service: 'WMS',
      srs: 'EPSG:4326',
      styles: '',
      //increase the tolrance for click
      buffer: 5,
      transparent: layer.options.transparent,
      version: layer.options.version,
      format: layer.options.format,
      bbox: map.getBounds().toBBoxString(),
      height: size.y,
      width: size.x,
      layers: layer.options.layers,
      query_layers: layer.options.layers,
      info_format: 'text/html',
    };
  
    params = L.Util.extend(defaultParams, params || {});
  
    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;
  
    //define the layer url
    var layer_url ="http://82.116.78.168/geoserver/geonode/ows";
    return layer_url + L.Util.getParamString(defaultParams, layer_url, true);
  
  }

   