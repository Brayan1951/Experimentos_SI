import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../interface/interface';

@Component({
  selector: 'app-alumno-menu',
  templateUrl: './alumno-menu.component.html',
  styleUrls: ['./alumno-menu.component.css']
})
export class AlumnoMenuComponent implements OnInit {

  alumno:Alumno[]=[]
msg:string=''
ok:boolean=false

busqueda='';
  constructor(private alumnoService:AlumnoService) { }

  ngOnInit(): void {
    this.alumnoService.alumnos()
    .subscribe(
      resp=>{
        // console.log(resp);
        this.alumno=resp
      }
    )
  }

  alumnos(){
    return this.alumno
  }

  delete(id:string){
    this.alumnoService.eliminar(id)
    .subscribe(resp=>{
      if (resp===true) {
        this.msg=resp
            this.ok=true
            window.location.reload()
      }else{
        this.msg=resp
        this.ok=false
      }
    })
  }

  find(){
    // console.log(this.busqueda);
    this.alumnoService.find(this.busqueda).subscribe(
      resp=>{
        this.alumno=resp
      }
    )
  }

}
