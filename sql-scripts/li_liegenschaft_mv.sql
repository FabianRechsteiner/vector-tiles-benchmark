DROP MATERIALIZED VIEW IF EXISTS avprodukt.li_liegenschaft_mv;
CREATE MATERIALIZED VIEW IF NOT EXISTS avprodukt.li_liegenschaft_mv AS
SELECT objectid, gs_nummer, gs_egris_egrid, wkb_geometry FROM avprodukt.li_liegenschaft;

GRANT SELECT ON avprodukt.li_liegenschaft_mv TO tileserver;
create unique index on avprodukt.li_liegenschaft_mv (objectid);