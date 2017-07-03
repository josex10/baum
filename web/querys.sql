INSERT INTO `tbl_facturas` (`fac_id`, `fac_cli_id`, `fac_fechacompra`, `fac_moneda`, `fac_puntosredim`, `fac_total`) 
VALUES ('2367', '114350445', '2016-12-20', 'Colones', '0', '175000');

INSERT INTO `tbl_articulos` (`art_id`, `art_fac_id`, `art_sku`, `art_cant`, `art_preciouni`) 
VALUES (NULL, '2367', '1289476527', '1', '175000');

INSERT INTO `tbl_puntos` (`pun_id`, `pun_fac_id`, `pun_totalpun`, `pun_tipo`) 
VALUES (NULL, '2367', '17500', 'Suma');