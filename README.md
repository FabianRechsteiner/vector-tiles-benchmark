# Performance comparison of open source vector tiles server solutions for providing geodata from PostGIS databases
This GitHub repository contains the attachments of Fabian Rechsteiner's master's thesis from May 2024, written in German, titled: [Performancevergleich von Open-Source-Vector-Tiles-Serverlösungen zur Bereitstellung von Geodaten aus PostGIS-Datenbanken](https://unigis.at/files/Mastertheses/Full/107112.pdf)

This repository can be used as a vector tiles benchmark to compare the performance of various vector tiles servers using Apache JMeter.

The following requirements must be met:
- A Linux server with Docker Compose is available.
- Apache JMeter is installed on the local computer.
- A localhost connection can be established from the computer to the server.

## 🎧 Podcast Summary

To make the main findings of the master's thesis more accessible, a short podcast version of the abstract was created — once in German and once in English.  
Both audio summaries were generated using **Gemini 2.5 Flash** and its *Audio Summary* feature.

- [🎧 German audio summary (MP3)](media/thesis-summary-de.mp3)
- [🎧 English audio summary (MP3)](media/thesis-summary-en.mp3)


## Interactive Comparison Map
Explore a live web map that contrasts the official **Swisstopo** vector-tiles with a new set of **cadastral survey (AV)** vector-tiles.  
From zoom levels **10 – 15** the AV layers—served as compact **PMTiles**—seamlessly replace the Swisstopo tiles, making it easy to spot differences in content and styling.

[![Preview of the swipe comparison map](https://github.com/user-attachments/assets/80135efe-5840-4c30-a083-06b9f76163b8)](https://fabianrechsteiner.github.io/vector-tiles-benchmark)

▶ **[Open the comparison map](https://fabianrechsteiner.github.io/vector-tiles-benchmark)**



## Abstract
The introduction of the new OGC API family marks a milestone in the exchange of geodata over the web. With the OGC API Tiles standard, both raster and vector data can now be provided as tiles, with vector data no longer being transmitted as images, but as geometry to the client. In this master's thesis, six open-source vector tiles servers (BBOX, Ldproxy, Martin, pg_tileserv, Tegola, and TiPg) are set up and configured using Docker in a public cloud. Vector tiles are created for each server from the vector data of the PostGIS database. Various test scenarios with Apache JMeter are used to determine which server can deliver the vector tiles the fastest. The results of the performance test show clear differences in the performance of the servers. One server proved to be by far the fastest, while another was clearly the slowest across all test scenarios. Additionally, a website is created using Maplibre GL JS to visually illustrate and compare the results. This master's thesis underscores the enormous potential and advantages of the new OGC API standards as well as vector tiles and aims to motivate geodata providers to offer their data according to these standards in the future.

## Methodology
<img align="right" width="50%" src="https://github.com/FabianRechsteiner/vector-tiles-benchmark/assets/43602650/ec14ffe3-d82c-4843-b6cb-0b5bf1cd16c7">

For the performance testing of vector tile server solutions, I utilized the cantonal geodata sourced from the [Amt für Geoinformation Thurgau](https://geoinformation.tg.ch/) as our test dataset. This dataset encompasses various tables stored within a PostGIS database.

To ensure a consistent evaluation of performance across different server solutions, I employed the same PostGIS database as the data source for each solution. To achieve this, I established a [public cloud](https://www.infomaniak.com/de/hosting/public-cloud) infrastructure through the Swiss cloud provider Infomaniak, deploying a Linux instance. A Linux server was then configured to host various applications within separate Docker containers. The foundational data was stored in its dedicated Docker container named 'postgis'. Each vector tile server under scrutiny was encapsulated within its own Docker container, accessible via individual ports.

In addition to the 6 primary applications, I set up two supplementary containers: 'nginx' served as a web server facilitating external access to the applications and accompanying HTML files, while the 'maputnik' container functioned as a vector tile style editor for defining the visual representation of the vector tiles.
</br>
</br>
</br>
</br>
</br>

### Overview vector-tiles-server

| **Name**                    | BBOX                                              | ldproxy                                              | Martin                                               | pg_tileserv                               | Tegola                                 | TiPg                        |
|-----------------------------|---------------------------------------------------|------------------------------------------------------|------------------------------------------------------|-------------------------------------------|----------------------------------------|-----------------------------|
| **Developer**               | [Sourcepole]                                      | [interactive instruments]                            | [MapLibre]                                           | [CrunchyData]                             | [Go Spatial]                           | [Development Seed]          |
| **Programming Language**    | Rust                                              | Java                                                 | Rust                                                 | Go                                        | Go                                     | Python                      |
| **Source Formats**          | PostGIS, MBTiles, PMTiles                         | HTTP, MBTiles, PostGIS, GPKG, SQLite, WFS, (GraphQL) | PostGIS, MBTiles, PMTiles                            | PostGIS                                   | PostGIS, GPKG, SAP HANA Spatial        | PostGIS                     |
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

## Implementation of the Vector Tiles Server

**vector-tiles-benchmark**
* bbox
  + bbox.toml
* ldproxy
  + cfg.yml
* martin
  + config.yaml
* nginx
  + html
  + nginx.conf
* pg_tileserv
  + pg_tileserv.toml
* sql-scripts
* tegola
  + config.toml
* tipg
  + .env
* vector-tiles-benchmark
  + test_plans
  + test_results
* .env
* .gitignore
* README.md
* compose.yaml

The file "compose.yaml" contains the configurations of all Docker containers. The configurations of each container are explained in the following sub-sections. Each container has been assigned a profile, with which the container can be started and stopped alongside the PostGIS database. An example of starting the container with a profile is: `docker compose --profile profilename up -d`

### PostGIS Database

To start only the postgis database without any other server you have to run the follwoing code with root permission (sudo -s) insisde the mvt-benchmark folder:
```yml
docker compose --profile postgis up -d
``` 
Note: Use the `-it` paramter instead of `-d` to show the log-File in the Terminal to show the errors. 

The database can now be connetcet with PGAdmin with the followed parameters:
- **host:** *your public IP-Adress oder Serveradress   Example: 195.15.345.35*
- **port:** `5432`
- **username:** `postgres`
- **password:** *your password defined in the compose.yaml or .env File*
- **database:** `postgres`

#### Import Data into PostGIS with PSQL

This guide will help you download a SQL backup file and import it into a PostGIS-enabled PostgreSQL database using the `psql` command-line tool within the PostGIS Docker container.

##### Prerequisites

- Ensure PostGIS is installed in your PostgreSQL database.
- The server should have a database named `postgres`.
- The database must contain a `public` schema with the `geometry` type enabled (via PostGIS).

##### Steps to Download and Import Data

1. **Download the Backup File**:  
   Download the SQL backup file (`avprodukt_prod_20231030.sql`, ~1.9 GB) from the following link to your server:
   - [Download SQL Backup](https://kdrive.infomaniak.com/app/share/928565/73497fef-18ca-4e50-9551-58a56bcaac44)

   Use `wget` to download the file directly to your server:
   ```bash
   wget https://kdrive.infomaniak.com/app/share/928565/73497fef-18ca-4e50-9551-58a56bcaac44 -O avprodukt_prod_20231030.sql
Navigate to the Backup Directory as the root user:

```bash
sudo -s
cd /path/to/your/backup/directory
```
Run the SQL Import Command directly from the PostGIS Docker container:

```bash
docker exec -i postgis psql -U postgres < avprodukt_prod_20231030.sql
```
Verify the Import:

Use PGAdmin or QGIS to check if the data has been imported correctly.

### BBOX

BBOX is a Webserver created by [Sourcepole](https://sourcepole.ch) and is a new Webserver-Solution to create OGC-API Features and OGC-API Tiles. T-REX -> BBOX

**Language:** RUST

[GitHub](https://github.com/sourcepole/bbox)

Start Server:
```yml
docker compose --profile bbox up -d
``` 
Stop Server:
```yml
docker compose --profile bbox down
``` 
Note:  `-d` `--detach` Detached mode: Run containers in the background 
Without the parameter the log-File will be shown in the Terminal

Open webbrowser: http://localhost:8804

Vector Tiles Request (Example: bo_boflaeche_mv): `http://localhost:8804/xyz/bo_boflaeche_mv/{z}/{x}/{y}.pbf`

Note: Because the port 8080 is already used for other Servers, the port 8080 got maped to 8804.

### ldproxy

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

Open webbrowser: http://localhost:7080/rest/services

Vector Tiles Request (Example: bo_boflaeche_mv): `http://localhost:7080/rest/services/avprodukt/collections/bo_boflaeche_mv/tiles/WebMercatorQuad/{z}/{y}/{x}`

### Martin

[Martin](https://martin.maplibre.org/) is an open-source vector tile server that allows generating and serving MVT (Mapbox Vector Tiles) from PostGIS tables, views, as well as from PMTiles or MBTiles. It enables the dynamic combination of multiple data sources within a single vector tile.

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

Open catalog in the webbrowser (List of all sources): http://localhost:3000/catalog

Vector Tiles Request (Example: bo_boflaeche_mv):

`http://localhost:3000/bo_boflaeche_mv/{z}/{x}/{y}` 
`http://localhost:3000/bo_boflaeche_mv,bo_projgebaeude_mv/{z}/{x}/{y}` 

### pg_tileserv

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

Open webbrowser: http://localhost:7800

Vector Tiles Request (Example: bo_boflaeche_mv):

`http://localhost:7800/avprodukt.bo_boflaeche_mv/{z}/{x}/{y}.pbf`
`http://localhost:7800/avprodukt.bo_boflaeche_mv,avprodukt.bo_projgebaeude_mv/{z}/{x}/{y}.pbf`  

### Tegola

Tegola is a Webserver created by the [Go Spatial Team](https://github.com/go-spatial) and is a  Webserver-Solution to create OGC-API Tiles from a PostGIS Database on the fly.

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

Open manager in the webbrowser: http://localhost:8090

Vector Tiles Request (Example: bo_boflaeche_mv):
`http://localhost:8080/maps/av/{z}/{x}/{y}.pbf` 


### TiPg

TiPg is pronounced *T[ee]pg*, is a Python package that helps create lightweight OGC Features and Tiles API with a PostGIS Database backend. The API has been designed for OGC Features and OGC Tiles specifications.
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

Open collections in the webbrowser (List of all sources): http://localhost:8080/collections

Vector Tiles Request (Example: bo_boflaeche_mv):
`http://localhost:8080/collections/avprodukt.bo_boflaeche_mv/tiles/WebMercatorQuad/{z}/{x}/{y}` 
`http://localhost:8080/bo_boflaeche_mv,bo_projgebaeude_mv/{z}/{x}/{y}` 


## Performancetest with Apchae JMeter

Apache JMeter is a powerful open-source tool used for testing the performance of web applications, APIs, and other services. It enables developers and testers to conduct various types of tests to evaluate the performance, scalability, and stability of their applications. With Apache JMeter, users can perform load tests, stress tests, throughput tests, behavioral and functional tests, and more. The tool can simulate a large number of users accessing the application simultaneously and records metrics such as response times, throughput, CPU usage, and errors to assess the application's performance under different conditions. Additionally, JMeter provides a user-friendly graphical interface for configuring test scenarios and is known for its scalability and flexibility.

To use Apache JMeter in graphical mode, the software is downloaded from its official website, and then the 'jmeter.bat' file is launched. In this mode, various test scenarios can be defined and executed. However, it is strongly recommended to perform the performance test not in GUI mode but in CLI mode (also known as Non-GUI mode).

To test all servers under as similar conditions as possible, a separate test plan is created for each server. This test plan contains all configurations and steps executed during the test. Such a test plan consists of various elements, including Thread Group, Logic Controller, Sampler, Listener, Timer, and Configurations.

The Thread Group forms the top-level element in the hierarchical structure of each test plan. Here, various parameters can be set that apply to the subsequent elements within this group. For example, the "Number of Threads (users)" parameter can be defined to specify how many virtual users simultaneously send requests to the server.

Below the Thread Group, Logic Controller elements are defined to control how requests are sent to the server. Within these Logic Controller elements, Samplers can be created to represent the corresponding server requests, such as HTTP requests.

Listeners can be placed at any point in the hierarchical structure to visualize the statistical data collected during the test. This can be done in the form of tables, graphs, or summary reports.

For each server, a test plan has been created and executed sequentially in CLI mode. The test plans are stored in the subdirectory [vector-tiles-benchmark/test_plans](/vector-tiles-benchmark/test_plans).

## Results

![image](https://github.com/FabianRechsteiner/vector-tiles-benchmark/assets/43602650/7ca7094c-6dab-4300-ba13-2554029e9644)

The bar chart illustrates the wide range of response times per server. Across all test scenarios, the Martin server showed the fastest performance in serving the tiles. For all servers, tile requests took the longest in test scenario 2. It is noticeable that the response times of the servers vary significantly in most test scenarios, except for test 3. For example, in test 1, the values ranged from 95 to 4153 milliseconds, while the differences in test 2 were even greater, with values between 122 and 8754 milliseconds.

Throughout all tests, the BBOX and Tegola servers showed a maximum response time difference of 41 milliseconds, indicating very similar response times. The Martin server delivered the tiles two to three times faster than the second fastest server. LdProxy took 4 to 70 times longer than Martin to deliver the tiles.

With the exception of test 3, the following server ranking can be established for all test scenarios:

1. Martin
2. Tegola
3. BBOX
4. Pg_tileserv
5. TiPg
6. Ldproxy


### Visual Performancetest
[![Visual Performancetest]](https://github.com/FabianRechsteiner/vector-tiles-benchmark/assets/43602650/cb9df8c3-0847-4965-b853-1a2a60363b5e)

The HTML and Javascript files are stored in the directory [nginx](/nginx).
