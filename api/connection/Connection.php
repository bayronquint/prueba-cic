<?php
class Connection extends mysqli
{
    function __construct()
    {
        parent::__construct('localhost', 'root', '', 'prueba_cic');
        $this->set_charset('utf8');
        if ($this->connect_error) {
            die('Error al conectarse a la base de datos (' . $this->connect_errno . ') ' . $this->connect_error);
        }
    }

    public function prepare_statement($sql)
    {
        return $this->prepare($sql);
    }
}
