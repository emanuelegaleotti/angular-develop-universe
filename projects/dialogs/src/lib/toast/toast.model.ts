export type ToastPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'

export class ToastModel {
  constructor(
    public position: ToastPosition,
    public id: string,
    public toastCloseIcon: string,
    public className?: string,
    public toastTitle?: string,
    public toastMessage?: string,
    public toastIcon?: string,
    public toastDateTime?: Date | string,
    public duration?: number | null
  ) {}
}

