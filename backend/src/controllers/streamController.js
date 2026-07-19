import Stream from "../models/Stream.js";
import StudentScore from "../models/studentScore.js";
import { buildReport } from "../services/streamRecommendationService.js";

/**
 * GET /api/streams
 */
export const getAllStreams = async (req, res) => {
  try {
    const streams = await Stream.find({ active: true })
      .select("-__v")
      .sort({ matchScore: -1 });

    return res.status(200).json({
      success: true,
      count: streams.length,
      data: streams,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch streams",
    });
  }
};

/**
 * GET /api/streams/:slug
 */
export const getStreamBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const stream = await Stream.findOne({
      slug,
      active: true,
    }).select("-__v");

    if (!stream) {
      return res.status(404).json({
        success: false,
        message: "Stream not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: stream,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/**
 * GET /api/streams/recommended/:studentId
 */
export const getRecommendedStream = async (req, res) => {
  try {
    const { studentId } = req.params;

   let studentScore = null;

if (studentId && studentId.match(/^[0-9a-fA-F]{24}$/)) {
  studentScore = await StudentScore.findOne({ studentId });
}
    if (!studentScore) {
      const fallbackStreams = await Stream.find({ active: true })
        .select("-__v")
        .sort({ matchScore: -1 });

      return res.status(200).json({
        success: true,
        recommendation: fallbackStreams[0] || null,
        rankedStreams: fallbackStreams,
        note: "Student scores not found. Showing default stream ranking.",
      });
    }

    const report = buildReport(studentScore);

    const rankedStreams = await Promise.all(
      report.rankedStreams.map(async (item) => {
        const stream = await Stream.findOne({
          slug: item.slug,
          active: true,
        }).select("-__v");

        if (!stream) return null;

        return {
          ...stream.toObject(),
          matchScore: item.score,
        };
      })
    );

    const filteredStreams = rankedStreams.filter(Boolean);

    return res.status(200).json({
      success: true,
      recommendation: filteredStreams[0] || null,
      rankedStreams: filteredStreams,
      report,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Recommendation failed",
      error: error.message,
    });
  }
};