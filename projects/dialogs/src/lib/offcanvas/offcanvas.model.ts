import {TemplateRef} from "@angular/core";

export class OffcanvasModel {
  constructor(
    public position: 'left' | 'right',
    public offcanvasCloseIcon: string,
    public id: string,
    public className?: string,
    public offcanvasData?: any,
    public offcanvasTitle?: string
  ) { }
}
