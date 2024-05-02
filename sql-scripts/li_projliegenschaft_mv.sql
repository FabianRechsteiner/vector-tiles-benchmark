DROP MATERIALIZED VIEW IF EXISTS avprodukt.li_projliegenschaft_mv;
CREATE MATERIALIZED VIEW IF NOT EXISTS avprodukt.li_projliegenschaft_mv AS
SELECT objectid, projgs_nummer, projgs_egris_egrid, wkb_geometry FROM avprodukt.li_projliegenschaft;

GRANT SELECT ON avprodukt.li_projliegenschaft_mv TO tileserver;
create unique index on avprodukt.li_projliegenschaft_mv (objectid);