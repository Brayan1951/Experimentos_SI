import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario, Curso, Respuesta } from '../interface/interface';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private baseUrl:string=environment.baseUrl;
  

  constructor(private authService:AuthService, private http:HttpClient) {
   

   }
addCurso(curso:Curso){
  let usuario:Usuario
  usuario =this.authService.usuario
  const url=`${this.baseUrl}/curso/new`
  const user=usuario
  const body={
    "usuario":user.id,
    "nombre":curso.nombre,
    "profesor":curso.profesor,
    "horaI":curso.horaI,
    "horaF":curso.horaF,
    "descripcion":curso.descripcion,

  }
return this.http.post<Curso>(url,body)

}


eliminar(id:string){
  const url=`${this.baseUrl}/curso/delete`
  const body={
    "id":id
  }

  return this.http.post<Respuesta>(url,body)
    .pipe(
      tap(({ok,msg})=>{
        if(ok){console.log("todo ok");
        }
      }),
      map(resp=>resp.ok),
      catchError(err=>of(err.error.msg))
    )
}





  cursos(){
    let usuario:Usuario
   usuario =this.authService.usuario
    const url=`${this.baseUrl}/curso/viewUser`
    const user=usuario
    const body={"usuario":user.id}
    // console.log(body);
    
    return this.http.post<Curso[]>(url,body)
    
  }


  viewId(id:string){
    const url=`${this.baseUrl}/curso/viewId`
    
    return this.http.get<Curso>(`${url}/${id}`)
  }

  update(id:string,curso:Curso){
  const url=`${this.baseUrl}/curso/update`


  const body={
    "id":id,
    "nombre":curso.nombre,
    "profesor":curso.profesor,
    "horaI":curso.horaI,
    "horaF":curso.horaF,
    "descripcion":curso.descripcion
  }
  console.log(body);
  return this.http.put<Respuesta>(`${url}/${id}`,body)
  .pipe(
    tap(({ok,msg})=>{
      if(ok){
        console.log("todo ok");
        
      }
    }),map(resp=>resp.ok),
    catchError(err=>of(err.error.msg))
  )

  }
}
