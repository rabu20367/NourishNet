'use server';

/**
 * @fileOverview Matches food donations to nearby recipients based on several factors.
 *
 * - matchDonation - A function that matches donations with recipients.
 * - MatchDonationInput - The input type for the matchDonation function.
 * - MatchDonationOutput - The return type for the matchDonation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchDonationInputSchema = z.object({
  donationDetails: z.string().describe('Details of the food donation, including type, quantity, and freshness.'),
  recipientNeeds: z.string().describe('Information about the recipient needs, including food type preferences and urgency.'),
  distanceMiles: z.number().describe('The distance between the donation and recipient in miles.'),
  inventoryCompatibility: z.string().describe('Details on the recipient inventory compatibility with the food donation.'),
});
export type MatchDonationInput = z.infer<typeof MatchDonationInputSchema>;

const MatchDonationOutputSchema = z.object({
  matchProbability: z.number().describe('The probability (0-1) that the donation is a good match for the recipient.'),
  rationale: z.string().describe('The detailed reasoning behind the match probability score.'),
  recommendations: z.string().describe('Recommendations for how to improve the match, if any.'),
});
export type MatchDonationOutput = z.infer<typeof MatchDonationOutputSchema>;

export async function matchDonation(input: MatchDonationInput): Promise<MatchDonationOutput> {
  return matchDonationFlow(input);
}

const matchDonationPrompt = ai.definePrompt({
  name: 'matchDonationPrompt',
  input: {schema: MatchDonationInputSchema},
  output: {schema: MatchDonationOutputSchema},
  prompt: `You are an AI assistant that specializes in matching food donations to nearby recipients.

  Based on the following information, determine the probability (0-1) that the donation is a good match for the recipient.
  Also, provide a rationale for your decision and recommendations for how to improve the match, if any.

  Donation Details: {{{donationDetails}}}
  Recipient Needs: {{{recipientNeeds}}}
  Distance (miles): {{{distanceMiles}}}
  Inventory Compatibility: {{{inventoryCompatibility}}}

  Match Probability: 
  Rationale:
  Recommendations: `,
});

const matchDonationFlow = ai.defineFlow(
  {
    name: 'matchDonationFlow',
    inputSchema: MatchDonationInputSchema,
    outputSchema: MatchDonationOutputSchema,
  },
  async input => {
    const {output} = await matchDonationPrompt(input);
    return output!;
  }
);
