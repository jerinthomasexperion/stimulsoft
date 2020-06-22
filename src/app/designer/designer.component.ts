import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var Stimulsoft: any;

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class DesignerComponent implements OnInit {

  designer=null;
  options: null;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    var report = Stimulsoft.Report.StiReport.createNewReport();
    this.options = new Stimulsoft.Designer.StiDesignerOptions();
    this.designer = new Stimulsoft.Designer.StiDesigner(this.options, 'StiDesigner', false);

    // //this.designOptions.appearance.fullScreenMode = false;
      this.http.get("http://localhost:61063/api/test").subscribe((params: any) => 
      {
        var ds = new Stimulsoft.System.Data.DataSet("Demo");
        ds.readXml(params.dataSet);
        report.regData("Demo","Demo",ds);
        report.load(params.reportInfo);
        this.designer.report = report;
        this.designer.renderHtml("designer");            
    });
  }

}
