// src/app/country-detail/country-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { ThemeService } from '../services/theme.service';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  country: Country | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchCountryDetails(id);
      }
    });
  }

  fetchCountryDetails(id: string) {
    this.dataService.getCountryByCode(id).subscribe({
      next: (country) => {
        this.country = country;
      },
      error: (error) => {
        console.error('Error fetching country details:', error);
        // Handle error (e.g., show error message or redirect)
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  goToCountry(code: string) {
    this.router.navigate(['/country', code]);
  }

  getCurrencies(currencies: any[]): string {
    return currencies?.map(c => c.name).join(', ') || 'N/A';
  }

  getLanguages(languages: any[]): string {
    return languages?.map(l => l.name).join(', ') || 'N/A';
  }
}