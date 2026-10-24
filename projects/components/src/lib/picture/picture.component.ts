import {Component, input, InputSignal} from '@angular/core'
import {TranslocoDirective} from "@jsverse/transloco";

type BreakPointMap = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const BREAKPOINT_MAP: Record<BreakPointMap, string> = {
  sm: '(min-width: 768px)',
  md: '(min-width: 1024px)',
  lg: '(min-width: 1366px)',
  xl: '(min-width: 1920px)',
  '2xl': '(min-width: 2560px)'
}

type PictureSource = {
  srcSet: string;
  srcSet2x?: string;
  srcSet3x?: string;
  type?: string;
  sizes?: string;
  height: number;
  width: number;
}

@Component({
  selector: 'ngu-picture',
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.scss',
  imports: [
    TranslocoDirective
  ],
  standalone: true
})
export class PictureComponent {
  id: InputSignal<string> = input.required<string>()
  src: InputSignal<string> = input.required<string>()
  alt: InputSignal<string> = input.required<string>()
  width: InputSignal<number> = input.required<number>()
  height: InputSignal<number> = input.required<number>()
  loading = input<'eager' | 'lazy'>('lazy')
  crossorigin = input<'anonymous' | 'use-credentials'>('anonymous')
  decoding = input<'sync' | 'async' | 'auto'>()
  fetchpriority = input<'high' | 'low' | 'auto'>('auto')
  referrpolicy = input<ReferrerPolicy>()
  sourceSm = input<PictureSource>()
  sourceMd = input<PictureSource>()
  sourceLg = input<PictureSource>()
  sourceXl = input<PictureSource>()
  source2xl = input<PictureSource>()

  buildSrcSet(source: PictureSource) {
    if (source.srcSet2x && source.srcSet3x) {
      return `${source.srcSet} 1x, ${source.srcSet2x} 2x, ${source.srcSet3x} 3x`
    } else if (source.srcSet2x) {
      return `${source.srcSet} 1x, ${source.srcSet2x} 2x`
    } else if (source.srcSet3x) {
      return `${source.srcSet} 1x, ${source.srcSet3x} 3x`
    }
    return `${source.srcSet} 1x`
  }

  protected readonly BREAKPOINT_MAP = BREAKPOINT_MAP;
}
