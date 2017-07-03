<?php

  class Cliente{

    private $db;
    private $cedula;
    private $nombre;
    private $apellido;
    private $telefono;
    private $fechaNac;
    private $fechaReg;
    private $estado;

    public function __construct() {
      $this->db = new Conexion();
    }

    public function agregarCliente($cedula, $nombre, $apellido, $telefono, $fechaNac) {
      $this->cedula = $cedula;
      $this->nombre = $nombre;
      $this->apellido = $apellido;
      $this->telefono = $telefono;
      $this->fechaNac = $fechaNac;
      $this->fechaReg = date("Y/m/d");
      $this->estado = 1;
      
      $consultaSQL = "INSERT INTO tbl_clientes (cli_id, cli_nombre, cli_apellido,  cli_telefono, cli_fechaNac, cli_fechaReg, cli_estado) VALUES ";

      $consultaSQL .= " ('$this->cedula', '$this->nombre', '$this->apellido', '$this->telefono', '$this->fechaNac', '$this->fechaReg', $this->estado);";

      if ($this->db->query($consultaSQL) === TRUE) {
          return true;
      } else {
          return false;
          //echo "Error: " . $consultaSQL . "<br>" . $this->db->error;
      }

      /* cerrar la conexión */
      $this->db->close(); 
    }

    public function existeCliente($cedula){
        $this->cedula = $cedula;

        $consultaSQL = "SELECT cli_id FROM tbl_clientes WHERE cli_id = '$this->cedula' ;";

        if ($this->db->query($consultaSQL)->num_rows > 0) {
            return true;
        } else {
            return false;
        }

        /* cerrar la conexión */
        $this->db->close();
    }

    public function buscarClientePorId($cedula){
        $this->cedula = $cedula;

        $consultaSQL = "SELECT * FROM tbl_clientes WHERE cli_id = '$this->cedula' ;";
        $result = $this->db->query($consultaSQL);

        
        $rows = array();
        while($row = $result->fetch_assoc()){
            $rows[] = $row;
        }

        return  $rows;
        

        /* cerrar la conexión */
        $this->db->close();
    }

    public function buscarTodosLosClientes(){

        $consultaSQL = "SELECT * FROM tbl_clientes ;";
        $result = $this->db->query($consultaSQL);

        
        $rows = array();
        while($row = $result->fetch_assoc()){
            $rows[] = $row;
        }

        return  $rows;
        

        /* cerrar la conexión */
        $this->db->close();
    }

    public function actualizarCliente($cedula, $nombre, $apellido, $telefono, $estado) {
      $this->cedula = $cedula;
      $this->nombre = $nombre;
      $this->apellido = $apellido;
      $this->telefono = $telefono;
      $this->estado = $estado;
      
      $consultaSQL = " UPDATE tbl_clientes ";
      $consultaSQL .= " SET cli_nombre= '$this->nombre', cli_apellido= '$this->apellido', cli_telefono= '$this->telefono', cli_estado= '$this->estado' ";
      $consultaSQL .= "WHERE cli_id =  '$this->cedula'; ";

      if ($this->db->query($consultaSQL) === TRUE) {
          return true;
      } else {
          return false;
          //echo "Error: " . $consultaSQL . "<br>" . $this->db->error;
      }

      /* cerrar la conexión */
      $this->db->close(); 
    }


  }

?>