import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';
  private pokemons: Observable<any> = this.http.get<any>(this.url);
  constructor(private http: HttpClient) { }

  public get apiListAllPokemons(): Observable<any> {
    return this.pokemons.pipe(
      tap(res => res), //Mapeando Pokemons
      tap(res => {
        res.results.map((respokemons: any) => { //Mapeando os results (dentro da lista de Pokemon)
          this.apiGetPokemons(respokemons.url).subscribe({
            next: (res) => respokemons.status = res,  //pegado o status do result
            error: (e) => console.log(e)
          });
        });
      })
    );
  }

  public apiGetPokemons(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map(res => res)
    );
  }
}
