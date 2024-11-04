import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../interfaces/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  constructor(
    public categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitForm(categoryForm: NgForm) {
    if (categoryForm.value.id == null) {
      this.categoryService
        .createCategory(categoryForm.value)
        .subscribe((response) => {
          this.router.navigate(['/test/angular/crud/list-category']);
        });
    } else {
      this.categoryService
        .updateCategory(categoryForm.value.id, categoryForm.value)
        .subscribe((response) => {
          this.router.navigate(['/test/angular/crud/list-category']);
        });
    }
    this.resetForm(categoryForm);
  }

  resetForm(categoryForm: NgForm) {
    if (categoryForm != null) {
      categoryForm.reset();
      this.categoryService.selectCategory = new Category();
    }
  }
}
