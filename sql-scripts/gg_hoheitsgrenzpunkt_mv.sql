DROP MATERIALIZED VIEW IF EXISTS avprodukt.gg_hoheitsgrenzpunkt_mv;
CREATE MATERIALIZED VIEW IF NOT EXISTS avprodukt.gg_hoheitsgrenzpunkt_mv AS
SELECT objectid, punktzeichen, wkb_geometry FROM avprodukt.gg_hoheitsgrenzpunkt;

GRANT SELECT ON avprodukt.gg_hoheitsgrenzpunkt_mv TO tileserver;
create unique index on avprodukt.gg_hoheitsgrenzpunkt_mv (objectid);