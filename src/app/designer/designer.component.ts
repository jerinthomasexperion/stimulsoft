import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScriptLoaderService } from '../script-loader-service.service';

declare var Stimulsoft: any;
declare var StiJsViewer: any;
declare var StiMobileDesigner: any;
@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class DesignerComponent implements OnInit {

  options: any;
  viewer: any;

  constructor(
    private scriptLoader: ScriptLoaderService) { }

  ngOnInit(): void {
    const url = 'http://localhost:61063/viewer';
    this.scriptLoader.loadScript(url).subscribe(res => {
      this.customHttpOverrides();
      Stimulsoft.Designer.parameters.requestUrl = url;
      Stimulsoft.Viewer.parameters.requestUrl = url;
      Stimulsoft.Viewer.parameters.requestUrl = url;
      this.options = new Stimulsoft.Designer.StiDesignerOptions();
      this.viewer = new Stimulsoft.Designer.StiDesigner(this.options, 'StiDesigner', false);
      this.viewer.renderHtml('designer');
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

    StiMobileDesigner.prototype.PostAjax = function (url, data, callback, requestType) {
      var jsObject = this;
      var xmlHttp = this.xmlHttp = this.CreateXMLHttp();
      this.xmlHttpAbortedByUser = false;
      if (this.options.actions) url = this.GetMvcActionUrl(url, data);

      if (jsObject.options.requestTimeout != 0) {
        var requestTimeout = this.CheckRequestTimeout(data);

        setTimeout(function () {
          if (xmlHttp.readyState < 4) xmlHttp.abort();
        }, (requestTimeout || jsObject.options.requestTimeout) * 1000);
      }

      xmlHttp.open(requestType || "POST", url);
      if (this.options.requestHeaderContentType && this.options.requestHeaderContentType != "") {
        xmlHttp.setRequestHeader("Content-Type", this.options.requestHeaderContentType);
      } else {
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      }
      xmlHttp.responseType = "text";
      if (data && data.responseType) xmlHttp.responseType = data.responseType;
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
          var status = 0;
          try {
            status = xmlHttp.status;
          }
          catch (e) {
          }

          if (status == 0) {
            callback("ServerError:Timeout response from the server.", jsObject);
          } else if (status == 200) {
            callback(xmlHttp.response ? xmlHttp.response : xmlHttp.responseText, jsObject);
          } else {
            callback("ServerError:" + status + " - " + xmlHttp.statusText, jsObject);
          }
        }
      };

      var params = this.CreatePostParameters(data, false);
      xmlHttp.send(params);
    }
  }

}