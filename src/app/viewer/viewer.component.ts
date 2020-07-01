import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Observable } from 'rxjs';
import{ScriptLoaderService} from '../script-loader-service.service'


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

  constructor(private http: HttpClient,
    private scriptLoader: ScriptLoaderService
    ) { }

  ngOnInit(): void {
      // Setting the required options on the client side
      const url = 'http://localhost:61063/viewer';
      this.scriptLoader.loadScript(url).subscribe(res => {
        this.customHttpOverrides();
        Stimulsoft.Viewer.parameters.requestUrl = url;
        this.options = new Stimulsoft.Viewer.StiViewerOptions();
        this.viewer = new Stimulsoft.Viewer.StiViewer(this.options, 'StiViewer', false);
        this.viewer.renderHtml('viewer');
      });
  }
  
  private customHttpOverrides() {
    StiJsViewer.prototype.postAjax = function (
      url: any, data: { action: string; responseType: any; },
      callback: (arg0: string, arg1: any) => void) {
      console.log('Custom working', this.options);
      if (data && data.action == 'GetReport') {
        this.options.paramsVariablesStartValues = null;

        if (this.controls.toolbar) {
          this.controls.toolbar.setEnabled(false);
          if (this.controls.navigatePanel) { this.controls.navigatePanel.setEnabled(false); }
        }
      }

      var jsObject = this;
      var xmlHttp = this.createConnection();
      this.openConnection(xmlHttp, url, data ? data.responseType : 'text');

      if (jsObject.options.server.requestTimeout != 0) {
        setTimeout(function () {
          if (xmlHttp.readyState < 4) { xmlHttp.abort(); }
        }, jsObject.options.server.requestTimeout * 1000);
      }

      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
          jsObject.service.isRequestInProcess = false;
          clearTimeout(jsObject.dashboardProcessTimeout);

          var status = 0;
          try {
            status = xmlHttp.status;
          } catch (e) {
          }

          if (status == 0) {
            callback('ServerError:Timeout response from the server.', jsObject);
          } else if (status == 200) {
            callback(xmlHttp.response ? xmlHttp.response : xmlHttp.responseText, jsObject);
          } else {
            if (jsObject.options.server.showServerErrorPage && xmlHttp.response) {
              jsObject.controls.reportPanel.innerHTML = xmlHttp.response;
            }
            callback('ServerError:' + status + ' - ' + xmlHttp.statusText, jsObject);
          }
        }
      };

      this.service.isRequestInProcess = true;
      var params = this.createPostParameters(data, false);
      xmlHttp.send(params);
    };
  }

}
