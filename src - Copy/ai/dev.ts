import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-pickup-times.ts';
import '@/ai/flows/donation-matcher.ts';
import '@/ai/flows/food-image-analyzer.ts';