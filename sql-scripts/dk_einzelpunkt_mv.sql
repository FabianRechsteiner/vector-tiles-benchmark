DROP MATERIALIZED VIEW IF EXISTS avprodukt.dk_einzelpunkt_mv;
CREATE MATERIALIZED VIEW IF NOT EXISTS avprodukt.dk_einzelpunkt_mv AS
SELECT objectid, punktzeichen, wkb_geometry FROM avprodukt.dk_einzelpunkt;

GRANT SELECT ON avprodukt.dk_einzelpunkt_mv TO tileserver;
create unique index on avprodukt.dk_einzelpunkt_mv (objectid);