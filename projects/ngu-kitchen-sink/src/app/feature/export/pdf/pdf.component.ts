import { Component } from '@angular/core'

@Component({
  selector: 'ngu-kitchensink-pdf',
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.scss'
})
export class PdfComponent {
  columns = ['Tecnologia', 'Anno', 'Utilizzo', 'Diffusione']
  rows: string[][] = [
    ['React', '2013', '~60–75% tra sviluppatori nei survey', 'USA / mercati anglofoni'],
    ['Vue.js', '2014', '~15% (survey dev)', 'Cina / Asia'],
    ['Angular', '2016', '~15–25%, forte in ambito enterprise', 'Europa e India'],
    ['Svelte', '2016', '~5–20%, in rapida crescita', 'Startup, EU/US'],
    ['Next.js', '2016', '~40–60% tra gli sviluppatori React', 'USA / ecosistema Vercel'],
    ['jQuery', '2006', '~70–90% dei siti (legacy)', 'Globale']
  ]

  async exportPDF (): Promise<void> {
    const [{ jsPDF }, { autoTable }] = await Promise.all([
      import('jspdf'),
      import('jspdf-autotable')
    ])
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Tecnologie frontend', 14, 18)
    autoTable(doc, {
      startY: 24,
      head: [this.columns],
      body: this.rows,
      headStyles: { fillColor: [133, 20, 245] }
    })
    doc.save('tecnologie-frontend.pdf')
  }
}
