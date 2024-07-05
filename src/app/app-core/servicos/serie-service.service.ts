 import { Injectable } from '@angular/core';
import {Serie} from "../model/serie";
import {Status} from "../model/status";
 import Dexie from "dexie";
@Injectable({
  providedIn: 'root'
})
export class SerieService extends Dexie{

  series: Dexie.Table<Serie,number>;

  constructor() {
    super('SerieDB');
    this.version(1).stores({
      series: '' +
        '++id, ' +
        'titulo, ' +
        'dataInicio, ' +
        'dataConclusao, ' +
        'status, ' +
        'descricao, ' +
        'imagem',
    });
    this.series = this.table('series');
  }

  async adicionarSerie(serie: Serie): Promise<number> {
    return await this.series.add(serie);
  }

  async buscarSerie(): Promise<Serie[]>{
    return await this.series.toArray();
  }

  async removerSerie(id:number): Promise<void>{
    return await this.series.delete(id);
  }

  async atualizarSerie(id: number, serie: Serie): Promise<number>{
    return await this.series.update(id, serie);
  }
}
