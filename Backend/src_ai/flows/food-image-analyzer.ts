'use server';

/**
 * @fileOverview Food image analysis AI agent.
 *
 * - analyzeFoodImage - A function that handles the food image analysis process.
 * - AnalyzeFoodImageInput - The input type for the analyzeFoodImage function.
 * - AnalyzeFoodImageOutput - The return type for the analyzeFoodImage function.
 */

import {ai} from '@/ai/genkit';
import {spawnSync} from 'child_process';
import path from 'path';
import {z} from 'genkit';

const AnalyzeFoodImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the food, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeFoodImageInput = z.infer<typeof AnalyzeFoodImageInputSchema>;

const AnalyzeFoodImageOutputSchema = z.object({
  foodType: z.string().describe('The type of food in the image.'),
  estimatedWeightKg: z.number().describe('The estimated weight of the food in kilograms.'),
  spoilageDetected: z
    .boolean()
    .describe('Whether or not signs of spoilage are detected in the image.'),
  packagingOk: z.boolean().describe('Whether or not the packaging is safe.'),
});
export type AnalyzeFoodImageOutput = z.infer<typeof AnalyzeFoodImageOutputSchema>;

export async function analyzeFoodImage(input: AnalyzeFoodImageInput): Promise<AnalyzeFoodImageOutput> {
  return analyzeFoodImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeFoodImagePrompt',
  input: {schema: AnalyzeFoodImageInputSchema},
  output: {schema: AnalyzeFoodImageOutputSchema},
  prompt: `You are an AI food safety expert.

You will analyze the provided image of food and provide the following information:

*   foodType: Identify the type of food in the image.
*   estimatedWeightKg: Estimate the weight of the food in kilograms.
*   spoilageDetected: Determine if there are any signs of spoilage in the image. Consider things like mold, discoloration, or other visual indicators of spoilage.
*   packagingOk: Verify if the packaging is safe for donation.

Analyze the food in the following image:

{{media url=photoDataUri}}

Ensure that your response is formatted as a JSON object that matches the schema.
`,
});

const analyzeFoodImageFlow = ai.defineFlow(
  {
    name: 'analyzeFoodImageFlow',
    inputSchema: AnalyzeFoodImageInputSchema,
    outputSchema: AnalyzeFoodImageOutputSchema,
  },
  async input => {
    const script = path.join(__dirname, '../cv-model/predict.py');
    const model = path.join(__dirname, '../cv-model/food_image_model.pt');
    try {
      const result = spawnSync('python3', [script, model, input.photoDataUri], {
        encoding: 'utf-8',
      });
      const out = result.stdout.trim();
      if (out) {
        return JSON.parse(out) as AnalyzeFoodImageOutput;
      }
    } catch (err) {
      console.error('cv model error', err);
    }
    const {output} = await prompt(input);
    return output!;
  }
);
