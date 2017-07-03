<?php

class Puntos{

    private $db;
    private $numFactura;
    private $cli_id;

    public function __construct() {
      $this->db = new Conexion();
    }

    public function totalPuntosDisponibles($numFactura){
        $this->numFactura = $numFactura;

        $consultaSQL = "SELECT pun_totalpun FROM tbl_puntos WHERE pun_fac_id = '$this->numFactura' ;";
        $result = $this->db->query($consultaSQL);

        $rows = array();
        while($row = $result->fetch_assoc()){
            $rows[] = $row;
        }

        return  $rows;
        

        /* cerrar la conexión */
        $this->db->close();
    }

    public function totalPuntosDisponiblesTest($cli_id){
        $this->cli_id = $cli_id;

        $consultaSQL = "SELECT * FROM tbl_puntos WHERE pun_fac_id IN (";
        $consultaSQL .= " SELECT fac_id FROM tbl_facturas WHERE fac_cli_id = '$this->cli_id' AND fac_fechacompra > date_add(now(), interval -1 year) );";

        $result = $this->db->query($consultaSQL);

        
        $rows = array();
        while($row = $result->fetch_assoc()){
            $rows[] = $row;
        }

        //Sumamos los puntos
        $totalPuntos =0;
        
        for($i =0; $i < count($rows); $i++){
            $totalPuntos += $rows[$i]['pun_totalpun'];
        }

        return $totalPuntos;
        /* cerrar la conexión */
        $this->db->close();
    }

  }
 /*
  $puntos = new Puntos();
  $resultado = $puntos->totalPuntosDisponiblesTest('114350445');
  echo $resultado;
 
  for($i = 0 ; $i < count($resultado); $i++){
    echo $resultado[$i]['pun_id'];
  }
  */
  

?>