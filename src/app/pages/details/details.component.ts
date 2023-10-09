import { PokeApiService } from '../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';
  public pokemons: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) { }


  ngOnInit(): void {
    this.getPokemon;
  }

  public getPokemon() {
    const id: string = this.activatedRoute.snapshot.params['id'];
    const pokemon: Observable<any> = this.pokeApiService.apiGetPokemons(`${this.urlPokemon}/${id}`);
    const pokemonName: Observable<any> = this.pokeApiService.apiGetPokemons(`${this.urlName}/${id}`);

    return forkJoin([pokemon, pokemonName]).subscribe({
      next: (res: any) => {
        this.pokemons = res;
        this.isLoading = true;
      },
      error: (e) => {
        console.log(e);
        this.apiError = true;
      },
      complete: () => console.info('complete')
    });
  }
}
