DROP MATERIALIZED VIEW IF EXISTS avprodukt.bo_projgebaeude_mv;
CREATE MATERIALIZED VIEW IF NOT EXISTS avprodukt.bo_projgebaeude_mv AS
SELECT objectid, wkb_geometry FROM avprodukt.bo_projgebaeude;

GRANT SELECT ON avprodukt.bo_projgebaeude_mv TO tileserver;
create unique index on avprodukt.bo_projgebaeude_mv (objectid);