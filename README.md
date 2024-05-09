# Performance comparison of open source vector tiles server solutions for providing geodata from PostGIS databases
This GitHub repository contains the attachments of Fabian Rechsteiner's master's thesis from May 2024, written in German, titled: Performancevergleich von Open-Source-Vector-Tiles-Serverlösungen zur Bereitstellung von Geodaten aus PostGIS-Datenbanken

This repository can be used as a vector tiles benchmark to compare the performance of various vector tiles servers using Apache JMeter.

The following requirements must be met:
- A Linux server with Docker Compose is available.
- Apache JMeter is installed on the local computer.
- A localhost connection can be established from the computer to the server.

## Abstract
The introduction of the new OGC API family marks a milestone in the exchange of geodata over the web. With the OGC API Tiles standard, both raster and vector data can now be provided as tiles, with vector data no longer being transmitted as images, but as geometry to the client. In this master's thesis, six open-source vector tiles servers (BBOX, Ldproxy, Martin, pg_tileserv, Tegola, and TiPg) are set up and configured using Docker in a public cloud. Vector tiles are created for each server from the vector data of the PostGIS database. Various test scenarios with Apache JMeter are used to determine which server can deliver the vector tiles the fastest. The results of the performance test show clear differences in the performance of the servers. One server proved to be by far the fastest, while another was clearly the slowest across all test scenarios. Additionally, a website is created using Maplibre GL JS to visually illustrate and compare the results. This master's thesis underscores the enormous potential and advantages of the new OGC API standards as well as vector tiles and aims to motivate geodata providers to offer their data according to these standards in the future.

## Methodology


"For the performance testing of vector tile server solutions, I utilized the cantonal geodata sourced from the 'Amt für Geoinformation Thurgau' as our test dataset. This dataset encompasses various tables stored within a PostGIS database.

To ensure a consistent evaluation of performance across different server solutions, I employed the same PostGIS database as the data source for each solution. To achieve this, I established a public cloud infrastructure through the Swiss cloud provider Infomaniak, deploying a Linux instance. A Linux server was then configured to host various applications within separate Docker containers. The foundational data was stored in its dedicated Docker container named 'postgis'. Each vector tile server under scrutiny was encapsulated within its own Docker container, accessible via individual ports.

In addition to the 6 primary applications, I set up two supplementary containers: 'nginx' served as a web server facilitating external access to the applications and accompanying HTML files, while the 'maputnik' container functioned as a vector tile style editor for defining the visual representation of the vector tiles."
![image](https://github.com/FabianRechsteiner/vector-tiles-benchmark/assets/43602650/e61389f7-41a2-49c2-9231-082fb455bb86)

## Overview vector-tiles-server

| **Name**                    | BBOX                                              | ldproxy                                              | Martin                                               | pg_tileserv                               | Tegola                                 | TiPg                        |
|-----------------------------|---------------------------------------------------|------------------------------------------------------|------------------------------------------------------|-------------------------------------------|----------------------------------------|-----------------------------|
| **Developer**               | [Sourcepole]                                      | [interactive instruments]                            | [MapLibre]                                           | [CrunchyData]                             | [Go Spatial]                           | [Development Seed]          |
| **Programming Language**    | Rust                                              | Java                                                 | Rust                                                 | Go                                        | Go                                     | Python                      |
| **Source Formats**          | PostGIS, MBTiles, PMTiles                         | HTTP, MBTiles, PostGIS, GPKG, SQLite, WFS, (GraphQL) | HTTP, MBTiles, PostGIS, GPKG, SQLite, WFS, (GraphQL) | PostGIS                                   | PostGIS, GPKG, SAP HANA Spatial        | PostGIS                     |
| **Output Data Format**      | MVT, MBTiles, PMTiles                             | MVT, MBTiles                                         | MVT, MBTiles                                         | MVT                                       | MVT                                    | MVT                         |
| **Creation Method**         | ST_AsMVT                                          | Feature Provider                                     | ST_AsMVT                                             | ST_AsMVT                                  | ST_AsMVT                               | ST_AsMVT                    |
| **Supported Tile Schemas**  | WebMercatorQuad (3857)      Benutzerdefiniert     | WebMercatorQuad (3857)      Benutzerdefiniert        | WebMercatorQuad (3857)                               | WebMercatorQuad (3857)                    | WebMercatorQuad (3857)                 | WebMercatorQuad (3857)      Benutzerdefiniert |
| **Filter Functions**        | ✔️                                                | ✔️                                                  | ✔️                                                   | ✔️                                       | ✔️                                     | ✔️                         |
| **Multi-Layer-Tiles**       | ✔️                                                | ❌                                                  | ✔️                                                   | ✔️                                       | ✔️                                     | ❌                         |
| **Caching**                 | ✔️                                                | ✔️                                                  | ✔️                                                   | ❌                                       | ✔️                                     | ❌                         |
| **OGC-API Features**        | ✔️                                                | ✔️                                                  | ❌                                                   | ❌                                       | ❌                                     | ✔️                         |
| **GitHub**                  | [BBOX - GitHub]                                   | [ldproxy - GitHub]                                   | [Martin - GitHub]                                    | [pg_tileserv - GitHub]                    | [Tegola - GitHub]                      | [Tipg - GitHub]             |
| **Docker Image**            | [sourcepole/bbox-server-qgis - Docker Image]      | [iide/ldproxy - Docker Image]                        | [martin - Docker Image]                              | [pramsey/pg_tileserv - Docker Image]      | [gospatial/tegola - Docker Image]      | [tipg - Docker Image]       |
| **Additional Documentation**| [BBOX - Documentation]                            | [ldproxy - Documentation]                            | [Martin - Documentation]                             | [pg_tileserv - Documentation]             | [Tegola - Documentation]               | [Tipg - Documentation]      |

<!-- Delevoper Links-->
[Sourcepole]:https://sourcepole.ch/
[interactive instruments]:https://www.interactive-instruments.de/
[MapLibre]:https://maplibre.org/
[CrunchyData]:https://www.crunchydata.com/
[Go Spatial]:https://github.com/go-spatial
[Development Seed]:https://developmentseed.org/

<!-- GitHub Links-->
[BBOX - GitHub]:https://github.com/bbox-services/bbox
[ldproxy - GitHub]:https://github.com/interactive-instruments/ldproxy
[Martin - GitHub]:https://github.com/maplibre/martin 
[pg_tileserv - GitHub]:https://github.com/CrunchyData/pg_tileserv
[Tegola - GitHub]:https://github.com/go-spatial/tegola
[Tipg - GitHub]:https://github.com/developmentseed/tipg

<!-- Docker Image Links-->
[sourcepole/bbox-server-qgis - Docker Image]:https://hub.docker.com/r/sourcepole/bbox-server-qgis
[iide/ldproxy - Docker Image]:https://hub.docker.com/r/iide/ldproxy
[martin - Docker Image]:https://github.com/maplibre/martin/pkgs/container/martin
[pramsey/pg_tileserv - Docker Image]:https://hub.docker.com/r/pramsey/pg_tileserv
[gospatial/tegola - Docker Image]:https://hub.docker.com/r/gospatial/tegola
[tipg - Docker Image]:https://github.com/developmentseed/tipg/pkgs/container/tipg

<!-- Documentation Links-->
[BBOX - Documentation]:https://www.bbox.earth/
[ldproxy - Documentation]:https://docs.ldproxy.net/
[Martin - Documentation]:https://maplibre.org/martin/
[pg_tileserv - Documentation]:https://access.crunchydata.com/documentation/pg_tileserv
[Tegola - Documentation]:https://tegola.io/documentation/
[Tipg - Documentation]:https://developmentseed.org/tipg/

## mvt-benchmark

### architecture

https://www.infomaniak.com/de/hosting/public-cloud

- Serverleistung:
- Betriebsystem:
- Test
- ...

### installation and start Server
All Servers and Application are storede in Docker-Conatainers and can be run with the explizit docker compose commando.

all parameters are safed in this docker compose file.

Alle Parameters  für das Aufsetzen der PostGIS Datenbank und der entsprechenden Server sind in docker-compose.ylm definiert.

Um die entsprechnden Server inklusiv der PostGIS-Datenbank zu starten, muss folgender Docker-Befehl im gleichen Verzeichnis wie das YML-File ausgeführt werden.

#### PostGIS Database

To start only the postgis database without any other server you have to run the follwoing code with root permission (sudo -s) insisde the mvt-benchmark folder:
```yml
docker compose --profile postgis up -d
``` 
Note: Use the `-it` paramter instead of `-d` to show the log-File in the Terminal to show the errors. 

The database can now be connetcet with PGAdmin with the followed parameters:
- **host:** *your public IP-Adress oder Serveradress   Example: 195.15.345.35*
- **port:** `5432`
- **username:** `postgres`
- **password:** *your password defined in the docker-compose.yml File*
- **database:** `postgres`

#### BBOX

BBOX is a Webserver created by [Sourcepole](https://sourcepole.ch) and is a new Webserver-Solution to create OGC-API Features and OGC-API Tiles. T-REX -> BBOX

**Language:** RUST
[GitHub](https://github.com/sourcepole/bbox)

```yml
docker compose --profile bbox up -d
``` 
Note:  `-d` `--detach` Detached mode: Run containers in the background 
Without the parameter the log-File will be shown in the Terminal

Open webbrowser:
- http://localhost:8804/collections
- http://127.0.0.1:8804/collections

Note: Because the port 8080 is already used for other Servers, the port 8080 got maped to 8804.

#### pg_tileserv

pg_tileserv is a Webserver created by [CrunchyData](https://www.crunchydata.com) and is a  Webserver-Solution to create OGC-API Tiles from a PostGIS Database on the fly.

**Language:** Go
[GitHub](https://github.com/CrunchyData/pg_tileserv)

Start Server:
```yml
docker compose --profile pg_tileserv up -d
``` 
Stop Server:
```yml
docker compose --profile pg_tileserv down
``` 
Note:  `-d` `--detach` Detached mode: Run containers in the background 
Without the parameter the log-File will be shown in the Terminal

Open webbrowser:
- http://localhost:7800
- http://localhost:7800/index.json

Vector Tiles:
```
http://localhost:7800/avprodukt.bo_boflaeche_mv/{z}/{x}/{y}.pbf
``` 


#### ldproxy

ldproxy is a Webserver created by [interactive instruments](https://www.interactive-instruments.de/) and is a  Webserver-Solution to create OGC-API Tiles and other OGC-API's from a PostGIS Database on the fly.

**Language:** 
[GitHub](https://github.com/interactive-instruments/ldproxy)

Start Server:
```yml
docker compose --profile ldproxy up -d
``` 
Stop Server:
```yml
docker compose --profile ldproxy down
``` 
Note:  `-d` `--detach` Detached mode: Run containers in the background 
Without the parameter the log-File will be shown in the Terminal

Open manager in the webbrowser:
- http://localhost:7080/manager
- http://127.0.0.1:7080/manager

Note: Because the port 7800 is already used for other Servers, the port 7800 got maped to 7080.

#### tegola

tegola is a Webserver created by the [Go Spatial Team](https://github.com/go-spatial) and is a  Webserver-Solution to create OGC-API Tiles from a PostGIS Database on the fly.

**Language:** Go
[GitHub](https://github.com/go-spatial/tegola)

Start Server:
```yml
docker compose --profile tegola up -d
``` 
Stop Server:
```yml
docker compose --profile tegola down
``` 
Note:  `-d` `--detach` Detached mode: Run containers in the background 
Without the parameter the log-File will be shown in the Terminal

Open manager in the webbrowser:
- http://localhost:8090
- http://127.0.0.1:8090

Vector Tiles:
```
http://localhost:8080/maps/av/{z}/{x}/{y}.pbf
``` 



#### martin

martin is a Webserver created by the ??? and is a  Webserver-Solution to create OGC-API Tiles from a PostGIS Database on the fly.

**Language:** Rust
[GitHub](https://github.com/maplibre/martin)

Start Server:
```yml
docker compose --profile martin up -d
``` 
Stop Server:
```yml
docker compose --profile martin down
``` 
Note:  `-d` `--detach` Detached mode: Run containers in the background 
Without the parameter the log-File will be shown in the Terminal

Open catalog in the webbrowser (List of all sources):
- http://localhost:3000/catalog
- http://127.0.0.1:3000/catalog

Vector Tiles:
```
http://localhost:3000/bo_boflaeche_mv/{z}/{x}/{y}
``` 
```
http://localhost:3000/bo_boflaeche_mv,bo_projgebaeude_mv/{z}/{x}/{y}
``` 

#### tipg

tipg is pronounced *T[ee]pg*, is a Python package that helps create lightweight OGC Features and Tiles API with a PostGIS Database backend. The API has been designed for OGC Features and OGC Tiles specifications.
> Note This project is the result of the merge between tifeatures and timvt.

**Language:** Python
[GitHub](https://github.com/developmentseed/tipg)

Start Server:
```yml
docker compose --profile tipg up -d
``` 
Stop Server:
```yml
docker compose --profile tipg down
``` 
Note:  `-d` `--detach` Detached mode: Run containers in the background 
Without the parameter the log-File will be shown in the Terminal

Open collections in the webbrowser (List of all sources):
- http://localhost:8080/collections
- http://127.0.0.1:8080/collections

Vector Tiles:
```
http://localhost:8080/collections/avprodukt.bo_boflaeche_mv/tiles/WebMercatorQuad/{z}/{x}/{y}
``` 
```
http://localhost:8080/bo_boflaeche_mv,bo_projgebaeude_mv/{z}/{x}/{y}
``` 
