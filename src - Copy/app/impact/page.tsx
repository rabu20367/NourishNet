'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockImpactStats } from '@/lib/data';
import { Utensils, Users, Leaf, Globe } from 'lucide-react'; // Replaced Co2 with Leaf
import type { LucideIcon } from 'lucide-react';

interface ImpactStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  colorClass?: string;
}

function ImpactStatCard({ title, value, icon: Icon, description, colorClass = 'text-primary' }: ImpactStatCardProps) {
  return (
    <Card className="shadow-lg transition-all hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${colorClass}`} />
      </CardHeader>
      <CardContent>
        <div className={`font-headline text-4xl font-bold ${colorClass}`}>{typeof value === 'number' ? value.toLocaleString() : value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}

export default function ImpactPage() {
  return (
    <div className="container mx-auto">
      <PageHeader 
        title="Our Impact" 
        description="Tracking the positive change NourishNet brings to communities."
        icon={TrendingUp} // Assuming TrendingUp is from nav-links or define here
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ImpactStatCard 
          title="Meals Rescued" 
          value={mockImpactStats.mealsRescued}
          icon={Utensils}
          description="+15% since last month"
          colorClass="text-primary"
        />
        <ImpactStatCard 
          title="Active Volunteers" 
          value={mockImpactStats.activeVolunteers}
          icon={Users}
          description="Making a difference daily"
          colorClass="text-accent-foreground" // Using accent foreground for variety
        />
        <ImpactStatCard 
          title="CO₂ Emissions Avoided" 
          value={`${mockImpactStats.co2EmissionsAvoidedKg.toLocaleString()} kg`}
          icon={Leaf} // Changed icon here
          description="Equivalent to 100 trees planted"
          colorClass="text-green-600" // Custom color for environment
        />
        <ImpactStatCard 
          title="Cities Supported" 
          value={mockImpactStats.citiesSupported}
          icon={Globe}
          description="Expanding our reach"
          colorClass="text-blue-600" // Custom color for reach
        />
      </div>

      <div className="mt-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Impact Over Time (Placeholder)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full flex items-center justify-center bg-muted/50 rounded-md border border-dashed">
              <p className="text-muted-foreground">Chart displaying meals rescued per month will be here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Dummy Icon for PageHeader if not imported
const TrendingUp = ({className}: {className?:string}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
