DROP MATERIALIZED VIEW IF EXISTS avprodukt.eo_linienelement_mv;
CREATE MATERIALIZED VIEW IF NOT EXISTS avprodukt.eo_linienelement_mv AS
SELECT objectid, art, wkb_geometry FROM avprodukt.eo_linienelement;

GRANT SELECT ON avprodukt.eo_linienelement_mv TO tileserver;
create unique index on avprodukt.eo_linienelement_mv (objectid);