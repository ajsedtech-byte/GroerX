import CareerReport from "../models/careerReport.js";

export async function getReport(req, res) {
  try {
    const report = await CareerReport.findOne({
      testAttemptId: req.params.attemptId
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }

    res.json({
      success: true,
      report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
