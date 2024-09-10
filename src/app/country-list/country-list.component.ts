// src/app/country-list/country-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { ThemeService } from '../theme.service';
import { IntersectionObserverDirective } from '../intersection-observer.directive';
import { Country } from '../models/country.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, FormsModule, IntersectionObserverDirective],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchTerm: string = '';
  selectedRegion: string = '';
  regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor(private dataService: DataService, public themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.dataService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.filteredCountries = [...this.countries];
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
      }
    });
  }

  filterCountries(): void {
    this.filteredCountries = this.countries.filter(country => 
      (country.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       country.region.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.selectedRegion === '' || country.region === this.selectedRegion)
    );
  }

  onRegionChange(region: string): void {
    this.selectedRegion = region;
    this.filterCountries();
  }

  onCountryClick(country: Country) {
    this.router.navigate(['/country', country.alpha3Code]);
  }
}