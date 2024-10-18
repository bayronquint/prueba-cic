import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../clases/cliente';


@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './listar-clientes.component.html',
  styleUrl: './listar-clientes.component.css'
})
export class ListarClientesComponent {
  clientes: Cliente[] = [];

  constructor(private clientesService : ClientesService) {}

  cargarClientes(){
    this.clientesService.obtenerClientes().subscribe(clientes => this.clientes = clientes);
  }

  deleteCliente(idCliente : number){
    this.clientesService.eliminarCliente(idCliente).subscribe(resultado => {
      if(!resultado['deleteCliente']){
        alert("No se pudo eliminar el cliente.")
      } else {
        this.cargarClientes()
      }
    })
  }

  ngOnInit(): void{
    this.cargarClientes();
  }

}
