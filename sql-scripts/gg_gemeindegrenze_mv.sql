DROP MATERIALIZED VIEW IF EXISTS avprodukt.tileservergg_gemeindegrenze_mv;
CREATE MATERIALIZED VIEW IF NOT EXISTS avprodukt.gg_gemeindegrenze_mv AS
SELECT objectid, gemeinde_name, gemeinde_bfsnr, wkb_geometry FROM avprodukt.gg_gemeindegrenze;

GRANT SELECT ON avprodukt.gg_gemeindegrenze_mv TO tileserver;
create unique index on avprodukt.gg_gemeindegrenze_mv (objectid);