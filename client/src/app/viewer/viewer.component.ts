import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Observable } from 'rxjs';
import { ScriptLoaderService } from '../script-loader-service.service'


declare var Stimulsoft: any;
declare var StiJsViewer: any;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  options: any;
  viewer: any;

  private loadedLibraries$: { [url: string]: ReplaySubject<any> } = {};

  constructor(
    private http: HttpClient,
    private scriptLoader: ScriptLoaderService
  ) { }

  ngOnInit(): void {
    const url = 'http://localhost:9090/api/viewer';
    this.scriptLoader.loadScript(url).subscribe(res => {
      Stimulsoft.Viewer.parameters.requestUrl = url;
      this.options = new Stimulsoft.Viewer.StiViewerOptions();
      this.viewer = new Stimulsoft.Viewer.StiViewer(this.options, 'StiViewer', false);
      this.viewer.renderHtml('viewer');
    });
  }

}
