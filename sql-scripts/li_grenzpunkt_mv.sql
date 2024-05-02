DROP MATERIALIZED VIEW IF EXISTS avprodukt.li_grenzpunkt_mv;
CREATE MATERIALIZED VIEW IF NOT EXISTS avprodukt.li_grenzpunkt_mv AS
SELECT objectid, punktzeichen, wkb_geometry FROM avprodukt.li_grenzpunkt;

GRANT SELECT ON avprodukt.li_grenzpunkt_mv TO tileserver;
create unique index on avprodukt.li_grenzpunkt_mv (objectid);