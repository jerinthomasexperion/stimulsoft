namespace StimulSoftTestAngular
{
  using System.Data;
  using Microsoft.AspNetCore.Mvc;
  using Stimulsoft.Report;
  using Stimulsoft.Report.Mvc;
  using Stimulsoft.Report.Web;

  /// <summary>
  /// Defines the <see cref="TestController" />
  /// </summary>
  [ApiController]


  public class TestController : Controller
  {
    /// <summary>
    /// The Get
    /// </summary>
    /// <returns>The <see cref="IActionResult"/></returns>
    [HttpGet]
    [Route("viewer")]
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

    /// <summary>
    /// The Post
    /// </summary>
    /// <returns>The <see cref="IActionResult"/></returns>
    [HttpPost]
    [Route("viewer")]
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

    /// <summary>
    /// The GetReportResult
    /// </summary>
    /// <returns>The <see cref="IActionResult"/></returns>
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
