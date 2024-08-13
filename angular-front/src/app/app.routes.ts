import { Routes } from '@angular/router';
import { AgregarClientesComponent } from './components/agregar-clientes/agregar-clientes.component';
import { ListarClientesComponent } from './components/listar-clientes/listar-clientes.component';
import { EditarClientesComponent } from './components/editar-clientes/editar-clientes.component';

export const routes: Routes = [
    {
        path: '',
        component: ListarClientesComponent
    },
    {
        path: 'agregar-cliente',
        component: AgregarClientesComponent
    },
    {
        path: 'editar-cliente/:idCliente',
        component: EditarClientesComponent
    },
    

];
