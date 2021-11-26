import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SeccionMenuComponent } from './secciones/seccion-menu/seccion-menu.component';
import { ProfesorMenuComponent } from './profesores/profesor-menu/profesor-menu.component';
import { CursoMenuComponent } from './cursos/curso-menu/curso-menu.component';
import { AlumnoMenuComponent } from './alumnos/alumno-menu/alumno-menu.component';
import { CursoRegistroComponent } from './cursos/curso-registro/curso-registro.component';
import { SeccionRegistroComponent } from './secciones/seccion-registro/seccion-registro.component';
import { ProfesorRegistroComponent } from './profesores/profesor-registro/profesor-registro.component';
import { AlumnoRegistroComponent } from './alumnos/alumno-registro/alumno-registro.component';
import { SeccionComponent } from './secciones/seccion/seccion.component';
import { CursoComponent } from './cursos/curso/curso.component';
import { ProfesorComponent } from './profesores/profesor/profesor.component';
import { AlumnoComponent } from './alumnos/alumno/alumno.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      {path:'Seccion',component:SeccionMenuComponent},
      {path:'Seccion/Agregar',component:SeccionRegistroComponent},
      {path:'Seccion/:id',component:SeccionComponent},
      {path:'Profesor',component:ProfesorMenuComponent},
      {path:'Profesor/Agregar',component:ProfesorRegistroComponent},
      {path:'Profesor/:id',component:ProfesorComponent},
      {path:'Cursos',component:CursoMenuComponent},
      {path:'Cursos/Agregar',component:CursoRegistroComponent},
      {path:'Cursos/:id',component:CursoComponent},
      {path:'Alumnos',component:AlumnoMenuComponent},
      {path:'Alumnos/Agregar',component:AlumnoRegistroComponent},
      {path:'Alumnos/:id',component:AlumnoComponent},
      {path:'**',redirectTo:'Seccion'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContenedorRoutingModule { }
