export const LANGUAGES = {
  ZH_CN: "zh-CN",
  EN: "en",
  MN_CYRL: "mn-Cyrl",
} as const;

export type LanguageCode = (typeof LANGUAGES)[keyof typeof LANGUAGES];

export const LANGUAGE_LABELS: Record<LanguageCode, string> = {
  [LANGUAGES.ZH_CN]: "中文",
  [LANGUAGES.EN]: "English",
  [LANGUAGES.MN_CYRL]: "Монгол хэл",
};

export const INITIAL_LANGUAGE_DIRECTIONS = [
  { nativeLanguageCode: LANGUAGES.ZH_CN, targetLanguageCode: LANGUAGES.EN },
  { nativeLanguageCode: LANGUAGES.ZH_CN, targetLanguageCode: LANGUAGES.MN_CYRL },
  { nativeLanguageCode: LANGUAGES.MN_CYRL, targetLanguageCode: LANGUAGES.ZH_CN },
  { nativeLanguageCode: LANGUAGES.MN_CYRL, targetLanguageCode: LANGUAGES.EN },
] as const;

export function isInitialLanguageDirection(
  nativeLanguageCode: string,
  targetLanguageCode: string,
) {
  return INITIAL_LANGUAGE_DIRECTIONS.some(
    (direction) =>
      direction.nativeLanguageCode === nativeLanguageCode &&
      direction.targetLanguageCode === targetLanguageCode,
  );
}

