 import { Injectable } from '@angular/core';
import {Serie} from "../model/serie";
import {Status} from "../model/status";

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  private serie: string[] = [];
  private serieTeste: Serie[] =[];
  constructor() {
  }
  addSerie(serie: string){
    this.serie.push(serie);
    console.log('SERIES CADASTRADAS: ', this.serie);
  }

  pupularTabelaTeste() : Serie[] {
    let status: Status= new Status(0, 'Concluida');
    let serie: Serie = new Serie(
      'SSSS.Gridman',
      '21/12/2022',
      '01/01/2023',
      'Robo gigante super detetive agora em anime!.',
      status,
      0);
    let serie2: Serie = new Serie(
      'Mashlee',
      '08/04/2023',
      '30/06/2023',
      'Pra ganhar de magia treine seus musculos! F### your magic.',
      status,
      0);
    this.serieTeste.push(serie, serie2);
    return this.serieTeste;
  }
}
