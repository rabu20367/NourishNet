'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/page-header';
import { MapPlaceholder } from '@/components/map-placeholder';
import { DonationCard } from '@/components/donation-card';
import { mockDonations, mockFoodCategories } from '@/lib/data';
import type { FoodCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ListFilter, Search, MapPin } from 'lucide-react';

export default function LiveMapPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'distance'>('recent'); // distance sorting is conceptual for now

  const filteredDonations = useMemo(() => {
    return mockDonations
      .filter(donation => {
        const matchesCategory = selectedCategory === 'All' || donation.category === selectedCategory;
        const matchesSearch = donation.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              donation.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              donation.donorName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'recent') {
          return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
        }
        // Add distance sorting logic here if coordinates are available and a user location is known
        return 0;
      });
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="container mx-auto">
      <PageHeader 
        title="Live Donations Map" 
        description="Find available food donations in real-time."
        icon={MapPin}
        actions={
          <Button>
            <ListFilter className="mr-2 h-4 w-4" /> Filter Options
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search donations..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={(value: FoodCategory | 'All') => setSelectedCategory(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by food type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Food Types</SelectItem>
            {mockFoodCategories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button 
            variant={sortBy === 'recent' ? 'default' : 'outline'} 
            onClick={() => setSortBy('recent')}
            className="flex-1"
          >
            Most Recent
          </Button>
          <Button 
            variant={sortBy === 'distance' ? 'default' : 'outline'} 
            onClick={() => setSortBy('distance')}
            className="flex-1"
            disabled // Distance sort not implemented
          >
            Nearest
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MapPlaceholder />
        </div>
        
        <div className="max-h-[calc(100vh-20rem)] space-y-4 overflow-y-auto lg:col-span-1">
          {filteredDonations.length > 0 ? (
            filteredDonations.map(donation => (
              <DonationCard key={donation.id} donation={donation} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center bg-muted/20 h-full">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="font-medium">No donations match your criteria.</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
