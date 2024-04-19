function setupMap(map, mapNumber) {
  map.on('style.load', () => {
      switch (mapNumber) {
          case 1:
              addVectorLayers(map, 'bbox', 'http://localhost:8804/xyz/', '/{z}/{x}/{y}.mvt', '&copy; <a href="https://www.vectormap.ch/">vectormap</a>','');
              break;
          case 2:
              addVectorLayers(map, 'ldproxy', 'http://localhost:7080/rest/services/avprodukt/collections/', '/tiles/WebMercatorQuad/{z}/{y}/{x}', '&copy; <a href="https://www.vectormap.ch/">vectormap</a>','');
              break;
          case 3:
              addVectorLayers(map, 'martin', 'http://localhost:3000/', '/{z}/{x}/{y}', '&copy; <a href="https://www.vectormap.ch/">vectormap</a>','');
              break;
          case 4:
              addVectorLayers(map, 'pg_tileserv', 'http://localhost:7800/', '/{z}/{x}/{y}.pbf', '&copy; <a href="https://www.vectormap.ch/">vectormap</a>', 'avprodukt.');
              break;
          case 5:
              addVectorLayers(map, 'tegola', 'http://localhost:8090/maps/avprodukt/', '/{z}/{x}/{y}.pbf', '&copy; <a href="https://www.vectormap.ch/">vectormap</a>','');
              break;
          case 6:
              addVectorLayers(map, 'tipg', 'http://localhost:8080/collections/avprodukt.', '/tiles/WebMercatorQuad/{z}/{x}/{y}', '&copy; <a href="https://www.vectormap.ch/">vectormap</a>','');
              break;
      }
  });
}

function addVectorLayers(map, server, prefix, suffix, attribution, layer_prefix) {
  // Define source and layer directly

  const layers = {
    'bo_boflaeche_mv': {
      'source': 'bo_boflaeche_mv-source',
      'layer': `${layer_prefix}bo_boflaeche_mv`,
      'type': 'line',
      'paint': {
        'line-color': 'rgb(0, 0, 255)'
      },
      'minzoom': 13
    },
    'gg_gemeindegrenze_mv': {
      'source': 'gg_gemeindegrenze_mv-source',
      'layer': `${layer_prefix}gg_gemeindegrenze_mv`,
      'type': 'line',
      'paint': {
        'line-color': 'rgb(0, 255, 0)'
      },
      'minzoom': 0
    },
    'li_liegenschaft_mv': {
      'source': 'li_liegenschaft_mv-source',
      'layer': `${layer_prefix}li_liegenschaft_mv`,
      'type': 'line',
      'paint': {
        'line-color': 'rgb(0, 0, 0)'
      },
      'minzoom': 13
    },
    'li_grenzpunkt_mv': {
      'source': 'li_grenzpunkt_mv-source',
      'layer': `${layer_prefix}li_grenzpunkt_mv`,
      'type': 'circle',
      'paint': {
        "circle-blur": 0,
        "circle-color": "#ffffff",
        "circle-opacity": 1,
        "circle-radius": 3,
        "circle-stroke-color": "#000000",
        "circle-stroke-opacity": 1,
        "circle-stroke-width": 1,
      },
      'minzoom': 17
    },
    'eo_linienelement_mv': {
      'source': 'eo_linienelement_mv-source',
      'layer': `${layer_prefix}eo_linienelement_mv`,
      'type': 'line',
      'paint': {
        "line-color": "#00a2ff",
        "line-width": 1
        },
        'minzoom': 13
    },
    'bo_projgebaeude_mv': {
      'source': 'bo_projgebaeude_mv-source',
      'layer': `${layer_prefix}bo_projgebaeude_mv`,
      'type': 'fill',
      'paint': {
        'fill-color': '#F00',
        'fill-opacity': 0.5,
        'fill-outline-color': 'rgb(255, 255, 255)'
        },
        'minzoom': 13
    }
  };


  Object.keys(layers).forEach(layer => {
    map.addSource(layers[layer].source, {
      'type': 'vector',
      'tiles': [
        `${prefix}${layers[layer].layer}${suffix}`
      ],
      'attribution': attribution,
      'minzoom': layers[layer].minzoom
    });

    map.addLayer({
      'id': layer,
      'type': layers[layer].type,
      'source': layers[layer].source,
      'source-layer': layers[layer].layer,
      'paint': layers[layer].paint
    });
  });
}


document.addEventListener('DOMContentLoaded', function () {
  const maps = [];
  const mapStyleSelector = document.getElementById('map-style-selector');
  let selectedStyle = mapStyleSelector.value;

  const mapSettings = {
      zoom: 15,
      center: [9.063727323272758, 47.583918972151814]
  };

  for (let i = 1; i <= 6; i++) {
      const map = new maplibregl.Map({
          container: `map${i}`,
          style: selectedStyle,
          ...mapSettings
      });

      setupMap(map, i); // Rufe die Funktion setupMap auf, um die Layer hinzuzufügen

      maps.push(map);
  }

  maps.forEach((map) => {
      map.on('move', () => syncMaps(maps, map));
  });

  mapStyleSelector.addEventListener('change', function () {
      selectedStyle = this.value;

      maps.forEach(map => {
          map.setStyle(selectedStyle);
      });
  });

  // Listen for changes in the layer control checkboxes
  document.querySelectorAll('#layer-control input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const layerId = this.getAttribute('id');
        const isVisible = this.checked;
        console.log(layerId)
        console.log(isVisible)

        // Toggle visibility of the layer for all maps
        maps.forEach(map => {
          const layer = map.getLayer(layerId);
          if (layer) {
              console.log(`Layer ${layerId} found in map ${map.getContainer().id}`);
              if (isVisible) {
                  console.log(`Setting layer ${layerId} visibility to visible`);
                  map.setLayoutProperty(layerId, 'visibility', 'visible');
              } else {
                  console.log(`Setting layer ${layerId} visibility to none`);
                  map.setLayoutProperty(layerId, 'visibility', 'none');
              }
          } else {
              console.log(`Layer ${layerId} not found in map ${map.getContainer().id}`);
          }
      });
      
    });
  });


  let isSyncing = false;

  function syncMaps(maps, sourceMap) {
      if (isSyncing) return;

      isSyncing = true;
      const { lng, lat } = sourceMap.getCenter();
      const zoom = sourceMap.getZoom();

      maps.forEach(map => {
          if (map !== sourceMap) {
              map.jumpTo({ center: [lng, lat], zoom: zoom });
          }
      });

      isSyncing = false;
  }
});
