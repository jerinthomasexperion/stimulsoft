namespace stimulsoft.server.api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Stimulsoft.Report;
    using Stimulsoft.Report.Mvc;
    using Stimulsoft.Report.Web;
    using System.Data;

    [Produces("application/json")]
    [Route("api/viewer")]
    public class ViewerController : Controller
    {
        static ViewerController()
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
            // Setting the required options on the server side
            /*var requestParams = StiNetCoreViewer.GetRequestParams(this);
            if (requestParams.Action == StiAction.Undefined)
            {
                var options = new StiNetCoreViewerOptions();
                options.Appearance.BookmarksPrint = false;

                return StiNetCoreViewer.GetScriptsResult(this, options);
            }*/

            return StiNetCoreViewer.ProcessRequestResult(this);
        }

        [HttpPost]
        public IActionResult Post()
        {
            var requestParams = StiNetCoreViewer.GetRequestParams(this);
            switch (requestParams.Action)
            {
                case StiAction.GetReport:
                    return GetReportResult();

                default:
                    return StiNetCoreViewer.ProcessRequestResult(this);
            }
        }

        [HttpPut]
        public IActionResult Put()
        {
            return View();
        }

        private IActionResult GetReportResult()
        {
            var dataSet = new DataSet();
            dataSet.ReadXml(StiNetCoreHelper.MapPath(this, "Reports/Data/Demo.xml"));

            var report = new StiReport();
            report.Load(StiNetCoreHelper.MapPath(this, "Reports/TwoSimpleLists.mrt"));
            report.RegData(dataSet);

            return StiNetCoreViewer.GetReportResult(this, report);
        }
    }
}
