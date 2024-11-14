import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../../core/interfaces/product.interface';
import { APIs } from '../../core/configs/APIs.config';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { NoDataComponent } from '../../shared/components/no-data/no-data.component';
import { AuthenticationService } from '../../core/services/authentication.service';
import { User } from '../../core/interfaces/user.interface';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from "../../shared/components/loading/loading.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NoDataComponent, MatCardModule, MatButtonModule, RouterLink, HttpClientModule, MatLabel, MatSelect, MatFormField, MatOption, LoadingComponent],
  providers: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  user: User | null = null;
  productsList: Product[] = [];
  categoriesList: string[] = [];
  selected = 'All';
  isLoading = false;

  constructor(private _titleService: Title, private _http: HttpClient, private _authenticationService: AuthenticationService) {
    this._titleService.setTitle("Categories");
  }

  ngOnInit() {
    this._authenticationService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
    this.getCategoriesList();
    this.getProductsList();
  }

  getCategoriesList() {
    this._http.get<string[]>(APIs.Products.GetCategoriesList).subscribe((res) => {
      this.categoriesList = ['All', ...res];
      this.isLoading = false;
    });
  }

  getProductsList() {
    this.isLoading = true;
    this._http.get<Product[]>(APIs.Products.GetProductsList).subscribe((res) => {
      this.productsList = res;
      this.isLoading = false;
    });
  }

  selectCategory(item: String) {
    this.isLoading = true;
    if(item == 'All') {
      this.getProductsList();
      return;
    }
    this._http.get<Product[]>(APIs.Products.GetCategory + item).subscribe((res) => {
      this.productsList = res;
      this.isLoading = false;
    });
  }

  deleteProduct(item: Product) {
    this._snackBar.open('Not implemented yet', 'Close', {
      duration: 2000,
    });
  }

  updateProduct(item: Product) {
    this._snackBar.open('Not implemented yet', 'Close', {
      duration: 2000,
    });
  }
}
