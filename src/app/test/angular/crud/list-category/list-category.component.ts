import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent implements OnInit {
  listCategories: any = [];

  constructor(public cs: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    return this.cs.getCategories().subscribe((data: {}) => {
      console.log(data);
      this.listCategories = data;
    });
  }

  onEdit(category: Category) {
    console.log(category);
    this.cs.selectCategory = Object.assign({}, category);
    this.router.navigate(['/test/angular/crud/add-category']);
  }

  onDelete(id: number) {
    this.cs.deleteCategory(id).subscribe((response) => {
      this.loadCategories();
    });
  }
}
