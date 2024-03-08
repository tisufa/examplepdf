import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'testing-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  protected currentDate: Date;
  public pages: number[];
  ngOnInit(): void {
    this.currentDate = new Date();
    this.pages = Array(10)
      .fill(0)
      .map((val, index) => val + index + 1);
  }
}
