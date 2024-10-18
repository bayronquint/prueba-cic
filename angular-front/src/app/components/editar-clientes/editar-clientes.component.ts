import { Component } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../clases/cliente';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-clientes',
  standalone: true,
  imports: [ FormsModule, RouterModule ],
  templateUrl: './editar-clientes.component.html',
  styleUrl: './editar-clientes.component.css'
})

export class EditarClientesComponent {
  cliente = new Cliente(0, '', 0, '', '')
  constructor(private clienteService: ClientesService, private router: Router, private params: ActivatedRoute){}

  editarCliente(){
    this.clienteService.editarCliente(this.cliente).subscribe(resultado => {
      if(resultado['updateCliente']){
        this.router.navigate(['/listar-clientes'])
      } else {
        alert('Ocurrió un error o la información no ha recibido un cambio a la original')
      }
    })
  }

  ngOnInit(): void{
    let id_cliente = this.params.snapshot.paramMap.get('idCliente')
    if (id_cliente !== null){
      this.clienteService.obtenerDonde(parseInt(id_cliente)).subscribe(cliente => this.cliente = cliente[0]);
    }
  }
}
