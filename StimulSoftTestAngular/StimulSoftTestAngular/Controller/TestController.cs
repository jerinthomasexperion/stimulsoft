using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stimulsoft.Report;
using Stimulsoft.Report.Mvc;
using Stimulsoft.Report.Web;
using System.Web.Http.Cors;
using Stimulsoft.Report.Design;
using Newtonsoft.Json;
using System.Xml;

namespace StimulSoftTestAngular
{
    [ApiController]


    public class TestController : Controller
    {

        [HttpGet]
        //[EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
        [Route("api/post")]
        public IActionResult Post()
        {
            //var requestParams = StiNetCoreViewer.GetRequestParams(this);
            //switch (requestParams.Action)
            //{
            //    case StiAction.GetReport:
            //return GetReportResult();

            //    default:
            //       return StiNetCoreViewer.ProcessRequestResult(this);
            //}
            var dataSet = new DataSet();
            dataSet.ReadXml(StiNetCoreHelper.MapPath(this, "Reports/Data/Demo.xml"));

            var report = new StiReport();
            report.Load(StiNetCoreHelper.MapPath(this, "Reports/TwoSimpleLists.mrt"));
             report.RegData(dataSet);
            report.Render(false);
            return Ok(report.SaveDocumentJsonToString());

            //var jsonstring = System.IO.File.ReadAllText("Reports/sample.json");
            //var xd = JsonConvert.DeserializeXmlNode(jsonstring);
            //var dataSet = new DataSet();
            // dataSet.ReadXml(new XmlNodeReader(xd), XmlReadMode.Auto);
            //var report = new StiReport();
            //report.Load(StiNetCoreHelper.MapPath(this, "Reports/sample.mrt"));
            //report.RegData("JSON", "JSON", dataSet);
            // report.Render(false);
            //return Ok(report.SaveDocumentJsonToString());
        }
        //private IActionResult GetReportResult()
        //{
        //    var dataSet = new DataSet();
        //    dataSet.ReadXml(StiNetCoreHelper.MapPath(this, "Reports/Data/Demo.xml"));

        //    var report = new StiReport();
        //    report.Load(StiNetCoreHelper.MapPath(this, "Reports/TwoSimpleLists.mrt"));
        //    report.RegData(dataSet);
        //    report.Render(false);

        //    return Ok(report.SaveDocumentJsonToString());
        //}   

        [HttpGet]
        [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
        [Route("api/design")]
        public IActionResult DesignerEvent()
        {
            var a = System.IO.File.ReadAllText("Reports/SimpleList.mrt");
            var report = new StiReport();
            //report.Load(StiNetCoreHelper.MapPath(this, "Reports/Simple.mrt"));
            //var a = report.SaveDocumentToString();
            return Ok(a);
        }


        [HttpGet]
        [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*", exposedHeaders:"*")]
        [Route("api/test")]
        public IActionResult Test()
        {
            StimulsoftDto stimulsoftDto = new StimulsoftDto();
            stimulsoftDto.DataSet = System.IO.File.ReadAllText("Reports/Data/Demo.xml");
            stimulsoftDto.ReportInfo = System.IO.File.ReadAllText("Reports/TwoSimpleLists.mrt");
            //report.Load(StiNetCoreHelper.MapPath(this, "Reports/Simple.mrt"));
            //var a = report.SaveDocumentToString();
            return Ok(stimulsoftDto);
        }

        [HttpGet]
        [EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
        [Route("api/viewer")]
        public IActionResult Viewer()
        {
            StimulsoftDto stimulsoftDto = new StimulsoftDto();
            stimulsoftDto.DataSet = System.IO.File.ReadAllText("Reports/Data/Demo.xml");
            stimulsoftDto.ReportInfo = System.IO.File.ReadAllText("Reports/TwoSimpleLists.mrt");
            //report.Load(StiNetCoreHelper.MapPath(this, "Reports/Simple.mrt"));
            //var a = report.SaveDocumentToString();
            return Ok(stimulsoftDto);
        }
    }


    public class StimulsoftDto
    {
        public string DataSet { get; set; }

        public string ReportInfo { get; set; }
    }
}
