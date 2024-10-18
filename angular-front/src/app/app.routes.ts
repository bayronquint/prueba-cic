import { Routes } from '@angular/router';
import { AgregarClientesComponent } from './components/agregar-clientes/agregar-clientes.component';
import { ListarClientesComponent } from './components/listar-clientes/listar-clientes.component';
import { EditarClientesComponent } from './components/editar-clientes/editar-clientes.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '../app/guard/authguard.guard'; // Importar la guarda de autenticación

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'listar-clientes',
        component: ListarClientesComponent,
        canActivate: [AuthGuard] // Proteger la ruta
    },
    {
        path: 'agregar-cliente',
        component: AgregarClientesComponent,
        canActivate: [AuthGuard] // Proteger la ruta
    },
    {
        path: 'editar-cliente/:idCliente',
        component: EditarClientesComponent,
        canActivate: [AuthGuard] // Proteger la ruta
    },
];
