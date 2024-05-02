DROP MATERIALIZED VIEW IF EXISTS avprodukt.ga_strassenstueck_mv;
CREATE MATERIALIZED VIEW IF NOT EXISTS avprodukt.ga_strassenstueck_mv AS
SELECT objectid, lokname_text, loknamepos_ori, loknamepos_lkoordx, loknamepos_lkoordy, wkb_geometry FROM avprodukt.ga_strassenstueck;

GRANT SELECT ON avprodukt.ga_strassenstueck_mv TO tileserver;
create unique index on avprodukt.ga_strassenstueck_mv (objectid);