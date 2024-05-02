DROP MATERIALIZED VIEW IF EXISTS avprodukt.bo_boflaeche_mv;
CREATE MATERIALIZED VIEW IF NOT EXISTS avprodukt.bo_boflaeche_mv AS
SELECT objectid, art, wkb_geometry FROM avprodukt.bo_boflaeche;

GRANT SELECT ON avprodukt.bo_boflaeche_mv TO tileserver;
create unique index on avprodukt.bo_boflaeche_mv (objectid);