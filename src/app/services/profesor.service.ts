import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario, Profesor, Respuesta } from '../interface/interface';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private baseUrl:string=environment.baseUrl;
 
  constructor(private authService:AuthService, private http:HttpClient) { 
 
  }
  registrar(prof:Profesor){
    let usuario:Usuario
    usuario =this.authService.usuario
    const user=usuario
    const body={
      "usuario":user.id,
      "nombre": prof.nombre.toLowerCase(),
      "apellido": prof.apellido.toLowerCase(),
      "dni": `${prof.dni}`,
      "telefono":`${prof.telefono}`,
      "email": prof.email,
      "especialidad": prof.especialidad

    }
    
    const url=`${this.baseUrl}/profesor/new`
    return this.http.post<Profesor>(url,body)
  }

  profesores(){
   let usuario =this.authService.usuario
    const url=`${this.baseUrl}/profesor/view`
    const user=usuario
    const body={"usuario":user.id}
    // console.log(body);
    
    return this.http.post<Profesor[]>(url,body)
  }


  delete(id:string){
    const url=`${this.baseUrl}/profesor/delete`

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
    const url=`${this.baseUrl}/profesor/find`
    const body={
      "usuario":user.id,
      "nombre":nombre.toLowerCase()
    }
    return this.http.post<Profesor[]>(url,body)
  }


  viewId(id:string){
    const url=`${this.baseUrl}/profesor/viewId`
    
    return this.http.get<Profesor>(`${url}/${id}`)
  }

  update(id:string,profe:Profesor){
    const url=`${this.baseUrl}/profesor/update`
  
  
    const body={
      
      "nombre": profe.nombre.toLowerCase(),
      "apellido": profe.apellido.toLowerCase(),
      "dni": `${profe.dni}`,
      "telefono": `${profe.telefono}`,
      "email": profe.email,
      "especialidad": profe.especialidad
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
