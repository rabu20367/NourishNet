'use client';

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PageHeader } from '@/components/page-header';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BrainCircuit, Sparkles, AlertTriangle, Lightbulb } from 'lucide-react';
import { matchDonation, type MatchDonationInput, type MatchDonationOutput } from '@/ai/flows/donation-matcher';
import { Separator } from '@/components/ui/separator';

const matchSchema = z.object({
  donationDetails: z.string().min(10, "Please provide more details about the donation."),
  recipientNeeds: z.string().min(10, "Please describe the recipient's needs."),
  distanceMiles: z.coerce.number().min(0, "Distance must be a positive number."),
  inventoryCompatibility: z.string().min(5, "Describe inventory compatibility briefly."),
});

type MatchFormValues = z.infer<typeof matchSchema>;

export default function AiMatchPage() {
  const { toast } = useToast();
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchDonationOutput | null>(null);

  const form = useForm<MatchFormValues>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      donationDetails: "Fresh vegetables (carrots, broccoli, spinach), approx 15kg. Harvested yesterday.",
      recipientNeeds: "Local shelter requires fresh produce for daily meals. Urgent need for vegetables.",
      distanceMiles: 5,
      inventoryCompatibility: "Shelter has refrigeration and can process fresh vegetables immediately.",
    },
  });

  async function onSubmit(data: MatchFormValues) {
    setIsMatching(true);
    setMatchResult(null);
    try {
      const result = await matchDonation(data);
      setMatchResult(result);
      toast({
        title: "Match Analysis Complete",
        description: `Match probability: ${(result.matchProbability * 100).toFixed(0)}%`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not perform match analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMatching(false);
    }
  }

  return (
    <div className="container mx-auto max-w-3xl">
      <PageHeader 
        title="AI Donation Matcher"
        description="Intelligently connect food donations with the most suitable recipients."
        icon={BrainCircuit}
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline">Matching Criteria</CardTitle>
            <CardDescription>Provide details for the AI to analyze.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="donationDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Donation Details</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="e.g., 10 boxes of apples, 5kg fresh bread..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipientNeeds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Needs</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="e.g., Soup kitchen needs vegetables, shelter needs non-perishables..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="distanceMiles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance (miles)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="inventoryCompatibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inventory Compatibility</FormLabel>
                      <FormControl>
                        <Textarea rows={2} placeholder="e.g., Has refrigeration, limited freezer space..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isMatching}>
                  {isMatching ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                    </>
                  ) : (
                    <>
                     <Sparkles className="mr-2 h-4 w-4" /> Find Best Match
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline">AI Match Analysis</CardTitle>
            <CardDescription>Results from the AI matching engine.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isMatching && (
              <div className="flex flex-col items-center justify-center space-y-2 p-8 text-muted-foreground">
                <BrainCircuit className="h-12 w-12 animate-pulse text-primary" />
                <p>AI is processing the information...</p>
              </div>
            )}
            {!isMatching && !matchResult && (
              <div className="flex flex-col items-center justify-center space-y-2 p-8 text-muted-foreground">
                 <BrainCircuit className="h-12 w-12 text-primary/50" />
                <p>Results will appear here once analysis is complete.</p>
              </div>
            )}
            {matchResult && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-1 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-primary" /> Match Probability
                  </h3>
                  <p className="text-3xl font-bold text-primary">
                    {(matchResult.matchProbability * 100).toFixed(0)}%
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-1 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" /> Rationale
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{matchResult.rationale}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-1 flex items-center">
                   <Lightbulb className="h-5 w-5 mr-2 text-green-500" /> Recommendations
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{matchResult.recommendations}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
