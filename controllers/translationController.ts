import Translation from "../models/Translation";
import catchAsync from "../utils/catchAsync";

export const addTranslation = catchAsync(async (req, res, _next) => {
  const { referenceId, referenceType, lang, fields } = req.body;

  const translation = await Translation.create({
    referenceId,
    referenceType,
    lang,
    fields,
  });

  res.status(201).json({
    status: "success",
    data: {
      translation,
    },
  });
});

