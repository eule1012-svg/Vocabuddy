import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().email(),
  username: z
    .string()
    .trim()
    .min(3)
    .max(24)
    .regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(8).max(72),
});

export const learningPlanSchema = z
  .object({
    nativeLanguageCode: z.string(),
    targetLanguageCode: z.string(),
    goalCode: z.string().min(1),
    currentLevel: z.string().min(1),
    targetLevel: z.string().min(1),
    dailyNewWordCount: z.number().int().min(1).max(100),
    dailyReviewLimit: z.number().int().min(1).max(200),
  })
  .refine(
    (data) => data.nativeLanguageCode !== data.targetLanguageCode,
    { message: "母语和目标语言不能相同", path: ["targetLanguageCode"] },
  );

