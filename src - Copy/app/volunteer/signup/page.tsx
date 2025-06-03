'use client';

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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from 'lucide-react';
import { daysOfWeek, timeOfDay } from '@/lib/data';
import type { DayOfWeek, TimeOfDay } from '@/lib/types';

const volunteerSignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format."),
  availableDays: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one day.",
  }),
  timePreferences: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one time preference.",
  }),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions.",
  })
});

type VolunteerSignupFormValues = z.infer<typeof volunteerSignupSchema>;

export default function VolunteerSignupPage() {
  const { toast } = useToast();
  const form = useForm<VolunteerSignupFormValues>({
    resolver: zodResolver(volunteerSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      availableDays: [],
      timePreferences: [],
      agreeToTerms: false,
    },
  });

  function onSubmit(data: VolunteerSignupFormValues) {
    console.log(data);
    toast({
      title: "Signup Successful!",
      description: `Thank you for signing up, ${data.name}. We'll be in touch.`,
      variant: "default", 
    });
    form.reset();
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <PageHeader 
        title="Become a Volunteer"
        description="Join NourishNet and help us fight food waste and hunger in your community."
        icon={UserPlus}
      />
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline">Volunteer Registration</CardTitle>
          <CardDescription>Fill out the form below to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jane.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="availableDays"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Available Days</FormLabel>
                      <FormDescription>
                        Select the days you are generally available.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {daysOfWeek.map((day) => (
                      <FormField
                        key={day}
                        control={form.control}
                        name="availableDays"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={day}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(day)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), day])
                                      : field.onChange(
                                          (field.value || []).filter(
                                            (value) => value !== day
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {day}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timePreferences"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Time Preferences</FormLabel>
                      <FormDescription>
                        Select your preferred times of day.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {timeOfDay.map((time) => (
                       <FormField
                        key={time}
                        control={form.control}
                        name="timePreferences"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={time}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(time)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), time])
                                      : field.onChange(
                                          (field.value || []).filter(
                                            (value) => value !== time
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {time}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Agree to terms and conditions
                      </FormLabel>
                      <FormDescription>
                        You agree to our Terms of Service and Privacy Policy.
                      </FormDescription>
                       <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full sm:w-auto">Register as Volunteer</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
