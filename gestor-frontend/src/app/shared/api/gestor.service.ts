import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Gestor } from '../models/gestor';


const BASE_API = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
//Singleton
export class GestorService {

  constructor(private http: HttpClient) { }

  public obterListaGestores(): Observable<Gestor[]> {
    return this.http.get<Gestor[]>(BASE_API + '/gestores');
  }

    public cadastrarGestor(gestor: Gestor): Observable<any>{
      const headers = new HttpHeaders ({
        "Content-Type": "application/json",
        "Accept": "application/json"
      })

      const body = JSON.stringify(gestor);
      return this.http.post(BASE_API + '/gestores', body, { headers });
    }

    excluirGestor(id: number): Observable<any>{
      return this.http.delete(BASE_API + '/gestores/' + id);
    }

    alterarGestor(gestor: Gestor): Observable<Gestor> {
      const headers = new HttpHeaders ({
        "Content-Type": "application/json",
        "Accept": "application/json"
      })

      const body = JSON.stringify(gestor);

      return this.http.put<Gestor>(BASE_API + '/gestores/' + gestor.id, body, { headers });
    }
}
