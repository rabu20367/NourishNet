'use server';

/**
 * @fileOverview A flow to suggest optimal pickup times for food donations.
 *
 * - suggestPickupTimes - A function that suggests pickup times based on food freshness and travel time.
 * - SuggestPickupTimesInput - The input type for the suggestPickupTimes function.
 * - SuggestPickupTimesOutput - The return type for the suggestPickupTimes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPickupTimesInputSchema = z.object({
  foodType: z.string().describe('The type of food being donated.'),
  foodFreshness: z.string().describe('How fresh the food is (e.g., just cooked, day old, etc.).'),
  estimatedTravelTime: z.number().describe('The estimated travel time in minutes from the donor to the recipient.'),
  donorLocation: z.string().describe('The address of the food donor.'),
  recipientLocation: z.string().describe('The address of the recipient.'),
});
export type SuggestPickupTimesInput = z.infer<typeof SuggestPickupTimesInputSchema>;

const SuggestPickupTimesOutputSchema = z.object({
  suggestedPickupTimes: z.array(
    z.string().describe('Suggested pickup times in HH:mm format.')
  ).describe('A list of suggested pickup times.'),
  reasoning: z.string().describe('The reasoning behind the suggested pickup times.'),
});
export type SuggestPickupTimesOutput = z.infer<typeof SuggestPickupTimesOutputSchema>;

export async function suggestPickupTimes(input: SuggestPickupTimesInput): Promise<SuggestPickupTimesOutput> {
  return suggestPickupTimesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPickupTimesPrompt',
  input: {schema: SuggestPickupTimesInputSchema},
  output: {schema: SuggestPickupTimesOutputSchema},
  prompt: `You are a logistics expert specializing in food delivery.

  Given the following information about a food donation, suggest three optimal pickup times, taking into account the food's freshness and the estimated travel time to minimize spoilage.

  Food Type: {{{foodType}}}
  Food Freshness: {{{foodFreshness}}}
  Estimated Travel Time: {{{estimatedTravelTime}}} minutes
  Donor Location: {{{donorLocation}}}
  Recipient Location: {{{recipientLocation}}}

  Format the suggested pickup times in HH:mm format. Also, provide a brief explanation for why these times are optimal.

  Output:
  {
    "suggestedPickupTimes": ["HH:mm", "HH:mm", "HH:mm"],
    "reasoning": "Explanation of why these times are optimal."
  }`,
});

const suggestPickupTimesFlow = ai.defineFlow(
  {
    name: 'suggestPickupTimesFlow',
    inputSchema: SuggestPickupTimesInputSchema,
    outputSchema: SuggestPickupTimesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
