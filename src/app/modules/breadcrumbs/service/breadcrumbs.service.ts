import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Breadcrumb} from '../../../global/entities/breadcrumbs.intarface';
import {ProductService} from '../../product/services/product.service';
import {LocalizerService} from '../../../global/services/localizer.service';

@Injectable({
  providedIn: 'root'
})

export class BreadcrumbsService {
  private breadcrumbs: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject<Breadcrumb[]>([]);
  public breadcrumbs$: Observable<Breadcrumb[]> = this.breadcrumbs.asObservable();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private localizerService: LocalizerService,
  ) {
  }


  generateBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): any {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return
    }

    for (const child of children) {
      if (child.outlet === 'primary') {
        const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
        if (routeURL !== '') {
          url += `/${routeURL}`;
        }

        const breadcrumb: Breadcrumb = {
          label: child.snapshot.url[child.snapshot.url.length - 1]?.path,
          url: url
        };

        if (child.snapshot.params['productId']) {
          this.productService.product$.subscribe(product => {
            breadcrumb.label = product.name;

          })
          breadcrumbs.push(breadcrumb)
        } else {
          breadcrumb.label = this.localizerService.breadcrumbsToUkr(breadcrumb.label)
          breadcrumbs.push(breadcrumb);
          this.generateBreadcrumbs(child, url, breadcrumbs);
        }
      }

      this.breadcrumbs.next(breadcrumbs);
    }
  }
}
