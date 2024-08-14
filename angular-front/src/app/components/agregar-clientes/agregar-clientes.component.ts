import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../clases/cliente';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-clientes',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './agregar-clientes.component.html',
  styleUrl: './agregar-clientes.component.css'
})
export class AgregarClientesComponent {
  cliente = new Cliente(0, '', 0, '', '')
  constructor(private clientesService : ClientesService, private router: Router){ }

  agregarCliente(){
    this.clientesService.agregarCliente(this.cliente).subscribe(resultado => {
      if(!resultado['insertCliente']){
        alert('Ocurrió un error al insertar la información del cliente.')
      } else{
        this.router.navigate(['/']);
      }
    })
  }
}
