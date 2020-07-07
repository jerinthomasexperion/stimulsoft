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
    const url = 'http://localhost:9090/api/designer';
    this.scriptLoader.loadScript(url).subscribe(res => {
      Stimulsoft.Designer.parameters.requestUrl = url;
      Stimulsoft.Viewer.parameters.requestUrl = url;
      this.options = new Stimulsoft.Designer.StiDesignerOptions();
      this.viewer = new Stimulsoft.Designer.StiDesigner(this.options, 'StiDesigner', false);
      this.viewer.renderHtml('designer');
    });
  }

}