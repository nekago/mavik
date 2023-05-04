import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductListService } from '../../services/product-list.service';
import {ActivatedRoute, Params} from '@angular/router';
import {lastValueFrom, Subject, takeUntil} from 'rxjs';
import {ProductListInterface} from "../../../../global/entities/product-list.interface";
import {Categories} from "../../../../global/entities/product.interface";

@Component({
	selector: 'app-product-list',
	templateUrl: 'product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
	private ngDestroy$ = new Subject<void>();
  public categories: Categories | null = null;
  public productListError: any | null = null;

	constructor(
		private productListService: ProductListService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.productListService.getCategoryByName({}).subscribe(data => {
      console.log(data)
    })

	}

	ngOnDestroy(): void {
		this.ngDestroy$.next();
		this.ngDestroy$.complete();
	}

  // public async getProductList(params: Params) {
  //   try {
  //     this.categories = await lastValueFrom(
  //       this.productListService.getCategoryByName(params)
  //     )
  //   } catch (e) {
  //     this.categories = null;
  //     this.productListError = e
  //   } finally {
  //
  //   }

  // }

}
