const getFitnessContextPrompt = (fitnessContext) => {
  if (!fitnessContext?.bmi) return 'No BMI context has been calculated yet.';

  return [
    `BMI: ${fitnessContext.bmi} (${fitnessContext.bmiInfo?.label || 'uncategorized'}).`,
    fitnessContext.goalLabel ? `Calculator goal: ${fitnessContext.goalLabel}.` : '',
    fitnessContext.bmi >= 30
      ? 'Prioritize low-impact cardio, joint-friendly strength work, longer warm-ups, and gradual progression.'
      : '',
    fitnessContext.bmi < 18.5
      ? 'Prioritize muscle-building strength work, moderate volume, and recovery.'
      : '',
  ].filter(Boolean).join(' ');
};

const buildPrompt = ({ goal, equipment, experience, duration, fitnessContext }) => {
  const goalLabel = goal === 'muscle_gain' ? 'muscle gain' : 'fat loss';

  return `You are a certified personal trainer. Create a single ${duration}-minute workout plan for ${goalLabel}.
Equipment available: ${equipment}.
Experience level: ${experience}.
User fitness context: ${getFitnessContextPrompt(fitnessContext)}

Return ONLY valid JSON (no markdown) in this exact shape:
{
  "title": "string",
  "subtitle": "string",
  "totalMinutes": number,
  "sections": [
    {
      "name": "Warm-up" | "Main workout" | "Cool-down",
      "duration": number,
      "exercises": [
        {
          "name": "string",
          "bodyPart": "chest|back|shoulders|upper legs|upper arms|waist|cardio",
          "sets": number,
          "reps": "string",
          "rest": "string",
          "notes": "string"
        }
      ]
    }
  ],
  "tips": ["string", "string", "string"]
}`;
};

const parseJsonResponse = (text) => {
  const cleaned = text.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
};

export const generateWithOpenAI = async (params) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You output only valid JSON workout plans.' },
          { role: 'user', content: buildPrompt(params) },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;

    const plan = parseJsonResponse(content);
    return { ...plan, source: 'openai' };
  } catch {
    return null;
  }
};

export const generateWithGemini = async (params) => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const model = process.env.REACT_APP_GEMINI_MODEL || 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(params) }] }],
        generationConfig: { temperature: 0.7 },
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) return null;

    const plan = parseJsonResponse(content);
    return { ...plan, source: 'gemini' };
  } catch {
    return null;
  }
};

export const generateWithAI = async (params) => {
  const openai = await generateWithOpenAI(params);
  if (openai) return openai;

  const gemini = await generateWithGemini(params);
  if (gemini) return gemini;

  return null;
};
