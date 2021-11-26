import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { min } from 'rxjs/operators';
import { Curso } from 'src/app/interface/interface';
import { CursosService } from '../../../services/cursos.service';
import { SeccionService } from '../../../services/seccion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seccion-registro',
  templateUrl: './seccion-registro.component.html',
  styleUrls: ['./seccion-registro.component.css']
})
export class SeccionRegistroComponent implements OnInit {
  curso!:Curso[] 
  
  miFormulario:FormGroup=this.fb.group({
    nombre:[,[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
    // curso:[,[Validators.required]],
    // curso:this.fb.array([],Validators.required),
    limite:[5,[Validators.required,Validators.min(5)]],
    //  especialidad:[,[Validators.required]]
  })

  // cursonew:FormControl=this.fb.control('',Validators.required)

  constructor(private fb:FormBuilder,private cursosService:CursosService,private seccionService:SeccionService,private router:Router) { }

  ngOnInit(): void {
    this.cursosService.cursos()
    .subscribe(
      resp=>{
        // console.log(resp);
        this.curso=resp
      }
    )
  }
  cursos(){
    return this.curso
  }

  addseccion(){
    const nombre=this.miFormulario.value.nombre
    const limite=this.miFormulario.value.limite
 
    
    this.seccionService.addSection(nombre,limite).subscribe(
      // resp=>{
      //   // console.log(resp);
      // }
    )
    this.router.navigateByUrl('/Menu/Seccion')
    
  }

}
