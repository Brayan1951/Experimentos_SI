import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { ContenedorModule } from './contenedor/contenedor.module';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'Auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>AuthModule)
  },
  {
    path:'Menu',
    loadChildren:()=>import('./contenedor/contenedor.module').then(m=>ContenedorModule),
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path:'**',
    redirectTo:'Auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
