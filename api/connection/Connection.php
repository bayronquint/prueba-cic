<?php
class Connection extends mysqli
{
    function __construct()
    {
        parent::__construct('localhost', 'root', '', 'prueba_cic');
        $this->set_charset('utf8');
        $this->connect_error == NULL ? 'Conexión exitosa a la DB' : die('Error al conectarse');
    }
}
