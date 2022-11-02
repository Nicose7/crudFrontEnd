import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  stringaBooleano: Boolean = true;

  ngOnInit(): void {}


/*@Input()
stringaTestRicevutaDalFiglio!: string;*/

@Output() passaggioFiglioPadre = new EventEmitter();
daFiglioaPadre(elementoDaPassare: string){
  this.passaggioFiglioPadre.emit(elementoDaPassare);
}
}
