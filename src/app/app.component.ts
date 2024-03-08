import { ApplicationRef, Component, createComponent } from '@angular/core';
import jsPDF from 'jspdf';
import { ReportComponent } from './report.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'testing';
  constructor(private _applicationRef: ApplicationRef) {}
  public async downloadPDF(): Promise<void> {
    const componentRef = createComponent(ReportComponent, {
      environmentInjector: this._applicationRef.injector,
    });
    componentRef.hostView.detectChanges();

    const element = (
      componentRef.location.nativeElement as HTMLElement
    ).children.item(0) as HTMLElement;

    const pdf = new jsPDF('p', 'pt', 'a3');

    const pageBreaks = element.getElementsByClassName('page-break');

    const elements: HTMLElement[] = [];

    let divElement = document.createElement('div');

    const isTrue = false;
    if (isTrue) return;

    Object.entries(element.children).forEach((entry) => {
      const element = entry[1];
      if (element.classList.contains('page-break')) {
        elements.push(divElement);
        divElement = document.createElement('div');
      } else {
        divElement.appendChild(element);
      }
    });

    this.createHTMLPDF(
      pdf,
      elements,
      pdf.getNumberOfPages(),
      pdf.internal.pageSize.getHeight()
    );
  }

  private createHTMLPDF(
    pdf: jsPDF,
    elements: Array<HTMLElement>,
    currentPage: number,
    height: number
  ): void {
    const element = elements.shift() as HTMLElement;
    pdf.html(element, {
      callback: (doc) => {
        if (elements.length === 0) {
          pdf.save('testing.pdf');
        } else {
          currentPage = pdf.getNumberOfPages() + 1;
          this.createHTMLPDF(
            pdf,
            elements,
            currentPage,
            doc.internal.pageSize.getHeight()
          );
        }
      },
      y: (currentPage - 1) * height,
    });
  }
}
