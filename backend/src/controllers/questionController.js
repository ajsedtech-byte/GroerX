import Question from "../models/Question.js";

export const uploadQuestions = async (req, res) => {
  try {
    const questions = req.body;

    await Question.deleteMany({
      assessmentCode: "RIASEC_100"
    });

    const result = await Question.insertMany(questions);

    res.json({
      success: true,
      inserted: result.length
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};