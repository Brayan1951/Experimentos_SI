import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../../services/cursos.service';
import { Curso } from '../../../interface/interface';

@Component({
  selector: 'app-curso-menu',
  templateUrl: './curso-menu.component.html',
  styleUrls: ['./curso-menu.component.css']
})
export class CursoMenuComponent implements OnInit {

   curso:Curso[] =[]

  constructor(private cursosService:CursosService) { }
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
  //  console.log(this.curso[0].profesor.nombre);
   
    return this.curso
  }
}
