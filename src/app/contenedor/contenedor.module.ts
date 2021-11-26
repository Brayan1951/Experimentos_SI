import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContenedorRoutingModule } from './contenedor-routing.module';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '../material/material.module';
import { SeccionMenuComponent } from './secciones/seccion-menu/seccion-menu.component';
import { ProfesorMenuComponent } from './profesores/profesor-menu/profesor-menu.component';
import { AlumnoMenuComponent } from './alumnos/alumno-menu/alumno-menu.component';
import { CursoMenuComponent } from './cursos/curso-menu/curso-menu.component';
import { AlumnoRegistroComponent } from './alumnos/alumno-registro/alumno-registro.component';
import { CursoRegistroComponent } from './cursos/curso-registro/curso-registro.component';
import { ProfesorRegistroComponent } from './profesores/profesor-registro/profesor-registro.component';
import { SeccionRegistroComponent } from './secciones/seccion-registro/seccion-registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CursoComponent } from './cursos/curso/curso.component';
import { SeccionComponent } from './secciones/seccion/seccion.component';
import { AlumnoComponent } from './alumnos/alumno/alumno.component';
import { ProfesorComponent } from './profesores/profesor/profesor.component';


@NgModule({
  declarations: [
    MainComponent,
    SeccionMenuComponent,
    ProfesorMenuComponent,
    AlumnoMenuComponent,
    CursoMenuComponent,
    AlumnoRegistroComponent,
    CursoRegistroComponent,
    ProfesorRegistroComponent,
    SeccionRegistroComponent,
    CursoComponent,
    SeccionComponent,
    AlumnoComponent,
    ProfesorComponent
  ],
  imports: [
    CommonModule,
    ContenedorRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ContenedorModule { }
