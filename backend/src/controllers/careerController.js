import Career from "../models/Career.js";

export const getAllCareers = async (req, res) => {
  try {
    const { stream } = req.query;

    const filter = { active: true };

    if (stream) {
      filter.streamSlugs = stream;
    }

    const careers = await Career.find(filter)
      .select("-__v")
      .sort({ matchScore: -1 });

    return res.status(200).json({
      success: true,
      count: careers.length,
      data: careers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch careers",
      error: error.message,
    });
  }
};

export const getCareerBySlug = async (req, res) => {
  try {
    const career = await Career.findOne({
      slug: req.params.slug,
      active: true,
    }).select("-__v");

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: career,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch career",
      error: error.message,
    });
  }
};