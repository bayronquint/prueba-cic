import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../clases/cliente';

@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './listar-clientes.component.html',
  styleUrl: './listar-clientes.component.css',
  providers: [DatePipe]
})
export class ListarClientesComponent {
  clientes: Cliente[] = [];

  constructor(private clientesService : ClientesService, private datePipe: DatePipe) {}

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
