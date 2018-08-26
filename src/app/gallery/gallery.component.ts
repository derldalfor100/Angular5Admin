import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  
  constructor() { }

  ngOnInit(): void {

      this.galleryOptions = [
          {
              width: '600px',
              height: '400px',
              thumbnailsColumns: 4,
              imageAnimation: NgxGalleryAnimation.Slide
          },
          // max-width 800
          {
              breakpoint: 800,
              width: '100%',
              height: '600px',
              imagePercent: 80,
              thumbnailsPercent: 20,
              thumbnailsMargin: 20,
              thumbnailMargin: 20
          },
          // max-width 400
          {
              breakpoint: 400,
              preview: false
          }
      ];

      this.galleryImages = [
          {
              small: 'assets/img/1-sm.jpg',
              medium: 'assets/img/1-med.jpg',
              big: 'assets/img/1-big.jpg'
          },
          {
              small: 'assets/img/2-sm.jpg',
              medium: 'assets/img/2-med.jpg',
              big: 'assets/img/2-big.jpg'
          },
          {
              small: 'assets/img/3-sm.jpg',
              medium: 'assets/img/3-med.jpg',
              big: 'assets/img/3-big.jpg'
          },
          {
            small: 'assets/img/4-sm.jpg',
            medium: 'assets/img/4-med.jpg',
            big: 'assets/img/4-big.jpg'
        },
        {
            small: 'assets/img/5-sm.jpg',
            medium: 'assets/img/5-med.jpg',
            big: 'assets/img/5-big.jpg'
        }
      ];
  }

}
