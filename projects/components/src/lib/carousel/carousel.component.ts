import {
  AfterViewInit,
  Component,
  ContentChild, ElementRef,
  input,
  InputSignal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'ngu-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  imports: [
    NgTemplateOutlet
  ],
  standalone: true
})
export class CarouselComponent implements AfterViewInit {
  id: InputSignal<string> = input.required<string>()
  slidesPerViewInput: InputSignal<number> = input(3, {
    transform: (value: number) => {
      if(value <= 0) throw new Error('Il valore deve essere maggiore di zero')
      return value;
    }
  })
  scrollButtons: InputSignal<boolean> = input<boolean>(false);
  scrollMarker: InputSignal<boolean> = input<boolean>(false);
  container: InputSignal<boolean> = input<boolean>(false);
  inert: InputSignal<boolean> = input<boolean>(false);
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>
  @ContentChild(TemplateRef, { static: false }) contentCarousel: TemplateRef<any> | null = null;

  ngAfterViewInit() {
    this.carousel.nativeElement.style.setProperty('--ngu-carousel-anchor-name', `--ngu-carousel-${this.id()}`)
    this.carousel.nativeElement.style.setProperty('--ngu-carousel-slides-per-view', `${this.slidesPerViewInput()}`)
  }
}
