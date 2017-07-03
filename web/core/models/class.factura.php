<?php

  class Factura{

    private $db;
    private $cedula;

    public function __construct() {
      $this->db = new Conexion();
    }

    public function buscarFacturasPorCliente($cedula){
        $this->cedula = $cedula;

        $consultaSQL = "SELECT * FROM tbl_facturas WHERE fac_cli_id = '$this->cedula' ;";
        $result = $this->db->query($consultaSQL);

        
        $rows = array();
        while($row = $result->fetch_assoc()){
            $rows[] = $row;
        }

        return  $rows;
        

        /* cerrar la conexión */
        $this->db->close();
    }

    public function buscarIdFacturasPorCliente($cedula){
        $this->cedula = $cedula;

        $consultaSQL = "SELECT fac_id FROM tbl_facturas WHERE fac_cli_id = '$this->cedula' ;";
        $result = $this->db->query($consultaSQL);

        
        $rows = array();
        while($row = $result->fetch_assoc()){
            $rows[] = $row;
        }

        return  $rows;
        

        /* cerrar la conexión */
        $this->db->close();
    }


  }

?>