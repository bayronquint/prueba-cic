import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../clases/cliente';
import { ClientesService } from '../../services/clientes.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-agregar-clientes',
  standalone: true,
  imports: [ FormsModule, RouterModule ],
  templateUrl: './agregar-clientes.component.html',
  styleUrl: './agregar-clientes.component.css'
})
export class AgregarClientesComponent {
  cliente = new Cliente(0, '', 0, '', '')
  constructor(private clientesService : ClientesService, private router: Router){ }

  agregarCliente(){
    if (!this.cliente.nombre || this.cliente.edad <= 0 || !this.cliente.fecha || !this.cliente.genero) {
      alert('Todos los campos son obligatorios. Por favor, complete la información del cliente.');
    } else{
      this.clientesService.agregarCliente(this.cliente).subscribe(resultado => {
        if(!resultado['insertCliente']){
          alert('Ocurrió un error al insertar la información del cliente.')
        } else{
          this.router.navigate(['listar-clientes']);
        }
      })
    }
  }
}
