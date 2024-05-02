DROP MATERIALIZED VIEW IF EXISTS avprodukt.eo_flaechenelement_mv;
CREATE MATERIALIZED VIEW IF NOT EXISTS avprodukt.eo_flaechenelement_mv AS
SELECT objectid, art, wkb_geometry FROM avprodukt.eo_flaechenelement;

GRANT SELECT ON avprodukt.eo_flaechenelement_mv TO tileserver;
create unique index on avprodukt.eo_flaechenelement_mv (objectid);