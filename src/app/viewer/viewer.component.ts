import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var Stimulsoft: any;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  viewer: any;
  options: any = new Stimulsoft.Viewer.StiViewerOptions();
  report: any = new Stimulsoft.Report.StiReport();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      // Setting the required options on the client side
      this.options.toolbar.showPrintButton = true;
      this.options.toolbar.showOpenButton = false;
      this.options.toolbar.ShowFindButton = false;
      this.options.toolbar.ShowAboutButton = false;
      this.options.toolbar.ShowSearchPanel = false;
      this.options.toolbar.ShowSinglePageViewModeButton = false;
      this.options.appearance.scrollbarsMode = true;
      this.options.toolbar.visible = true;
      this.options.toolbar.showDesignButton = false;
      this.options.height = "600px";
      this.viewer = new Stimulsoft.Viewer.StiViewer(this.options, 'StiViewer', false);
      this.http.get("http://localhost:61063/api/test").subscribe((params : any) => 
      {
          var ds = new Stimulsoft.System.Data.DataSet("Demo");
          ds.readXml(params.dataSet);
          this.report.regData("Demo", "Demo", ds);
          this.report.load(params.reportInfo);
        this.viewer.report = this.report;
          this.viewer.renderHtml('viewer');     
                  
    });
  }
  

}
