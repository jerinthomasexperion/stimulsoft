namespace stimulsoft.server.api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Stimulsoft.Report;
    using Stimulsoft.Report.Mvc;
    using Stimulsoft.Report.Web;
    using System.Data;

    [Produces("application/json")]
    [Route("api/designer")]
    public class DesignerController : Controller
    {
        static DesignerController()
        {
        }

        [HttpDelete]
        public IActionResult Delete()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return StiNetCoreDesigner.ProcessRequestResult(this);
        }

        [HttpPost]
        public IActionResult Post()
        {
            var requestParams = StiNetCoreDesigner.GetRequestParams(this);
            switch (requestParams.Action)
            {
                case StiAction.GetReport:
                    return GetReportResult();

                case StiAction.PreviewReport:
                    return GetReportPreviewResult();

                default:
                    return StiNetCoreDesigner.ProcessRequestResult(this);
            }
        }

        [HttpPut]
        public IActionResult Put()
        {
            return View();
        }

        private IActionResult GetReportPreviewResult()
        {
            var dataSet = new DataSet();
            var data = StiNetCoreHelper.MapPath(this, "Reports/TwoSimpleLists.mrt");
            var mrt = StiNetCoreHelper.MapPath(this, "Reports/Data/Demo.xml");

            dataSet.ReadXml(mrt);
            var report = new StiReport();
            report.Load(data);
            report.RegData(dataSet);
            report.Dictionary.Synchronize();

            return StiNetCoreDesigner.PreviewReportResult(this, report);
        }

        private IActionResult GetReportResult()
        {
            var dataSet = new DataSet();
            var data = StiNetCoreHelper.MapPath(this, "Reports/TwoSimpleLists.mrt");
            var mrt = StiNetCoreHelper.MapPath(this, "Reports/Data/Demo.xml");

            dataSet.ReadXml(mrt);
            var report = new StiReport();
            report.Load(data);
            report.RegData(dataSet);
            report.Dictionary.Synchronize();

            return StiNetCoreDesigner.GetReportResult(this, report);
        }
    }
}
