import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Item } from '../data.service';
import { ThemeService } from '../theme.service';
import { IntersectionObserverDirective } from '../intersection-observer.directive';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, IntersectionObserverDirective],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Output() statisticsUpdate = new EventEmitter<{ totalItems: number; averageBodyLength: number; viewCount: number }>();

  items: Item[] = [];
  filteredItems: Item[] = [];
  paginatedItems: Item[] = [];
  error: string = '';
  sortKey: keyof Item = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';
  selectedTags: string[] = [];
  allTags: string[] = ['important', 'urgent', 'personal', 'work', 'project', 'meeting', 'idea'];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 1;

  // View counter
  viewCount: number = 0;

  constructor(private dataService: DataService, public themeService: ThemeService) {}

  ngOnInit(): void {
    this.fetchItems();
    this.initViewCount();
  }

  fetchItems(): void {
    this.dataService.getItems().subscribe({
      next: (data) => {
        this.items = data.map((item) => ({
          ...item,
          tags: this.generateRandomTags(),
        }));
        this.filteredItems = [...this.items];
        this.sortItems(this.sortKey);
        this.updatePagination();
        this.calculateStatistics();
      },
      error: (error) => {
        this.error = 'Error fetching items. Please try again later.';
        console.error('There was an error!', error);
      },
    });
  }

  sortItems(key: keyof Item): void {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.filteredItems.sort((a, b) => {
      if (a[key] < b[key]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    this.updatePagination();
  }

  calculateStatistics(): void {
    const totalItems = this.filteredItems.length;
    const averageBodyLength = this.filteredItems.reduce((sum, item) => sum + item.body.length, 0) / totalItems;
    this.statisticsUpdate.emit({ totalItems, averageBodyLength, viewCount: this.viewCount });
  }

  generateRandomTags(): string[] {
    return this.allTags.filter(() => Math.random() > 0.5);
  }

  filterItems(): void {
    this.filteredItems = this.items.filter(
      (item) =>
        (item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.body.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        (this.selectedTags.length === 0 || this.selectedTags.every((tag) => item.tags.includes(tag)))
    );
    this.currentPage = 1;
    this.updatePagination();
    this.calculateStatistics();
  }

  removeTag(tag: string): void {
    this.selectedTags = this.selectedTags.filter((t) => t !== tag);
    this.filterItems();
  }

  addTag(tag: string): void {
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
      this.filterItems();
    }
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    this.paginatedItems = this.filteredItems.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  initViewCount(): void {
    this.viewCount = Math.floor(Math.random() * 1000) + 1;
    setInterval(() => {
      this.viewCount += Math.floor(Math.random() * 5) + 1;
      this.calculateStatistics();
    }, 60000); // Update every minute
  }
}