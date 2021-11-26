import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profesor } from 'src/app/interface/interface';
import { ProfesorService } from '../../../services/profesor.service';
import { CursosService } from '../../../services/cursos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curso-registro',
  templateUrl: './curso-registro.component.html',
  styles: [
  ]
})
export class CursoRegistroComponent implements OnInit {

  profesorTotal:Profesor[]=[]

  miFormulario:FormGroup=this.fb.group({
    nombre:[,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    profesor:[,[Validators.required]],
    horaI:[,[Validators.required]],
    horaF:[,[Validators.required]],
    descripcion:[,[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
  })
  constructor(private fb:FormBuilder,private profesorService:ProfesorService,private cursoService:CursosService,private router:Router) { }

  ngOnInit(): void {
    this.profesorService.profesores()
    .subscribe(
      resp=>{
        // console.log(resp);
        this.profesorTotal=resp
      }
    )
  }
  registro(){
    const curs=this.miFormulario.value
    // console.log(curs);
    // return

    this.cursoService.addCurso(curs).subscribe(
      resp=>{
      // console.log(resp);
      
    })
    this.router.navigateByUrl('/Menu/Cursos')
    
  }
}
