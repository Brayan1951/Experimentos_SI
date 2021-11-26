import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario, Alumno, Respuesta } from '../interface/interface';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private baseUrl:string=environment.baseUrl;
  
  constructor(private authService:AuthService, private http:HttpClient) { 
   
  }

  registrar(alum:Alumno){
    let usuario:Usuario
    usuario =this.authService.usuario
    const user=usuario
    const body={
      "usuario":user.id,
      "nombre": alum.nombre.toLowerCase(),
      "apellido": alum.apellido.toLowerCase(),
      "dni": `${alum.dni}`,
      "telefono":`${alum.telefono}`,
      "email": alum.email,
      "gusto": alum.gusto

    }
    
    const url=`${this.baseUrl}/alumno/new`
    return this.http.post<Alumno>(url,body)
  }

  alumnos(){
    let usuario:Usuario
    usuario =this.authService.usuario
    const user=usuario
    const url=`${this.baseUrl}/alumno/view`
    const body={"usuario":user.id}
    // console.log(user);
    
    return this.http.post<Alumno[]>(url,body)
  }


  eliminar(id:string){
    const url=`${this.baseUrl}/alumno/delete`
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



  find(nombre:string){
    let usuario:Usuario
    usuario =this.authService.usuario
    const user=usuario
    const url=`${this.baseUrl}/alumno/find`
    const body={
      "usuario":user.id,
      "nombre":nombre.toLowerCase()
    }
    return this.http.post<Alumno[]>(url,body)
  }
  
  viewId(id:string){
    const url=`${this.baseUrl}/alumno/viewId`
    
    return this.http.get<Alumno>(`${url}/${id}`)
  }

  update(id:string,profe:Alumno){
    const url=`${this.baseUrl}/alumno/update`
  
  
    const body={
      
      "nombre": profe.nombre.toLowerCase(),
      "apellido": profe.apellido.toLowerCase(),
      "dni": `${profe.dni}`,
      "telefono": `${profe.telefono}`,
      "email": profe.email,
      "gusto": profe.gusto
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
