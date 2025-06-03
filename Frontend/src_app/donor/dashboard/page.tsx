'use client';

import { PageHeader } from '@/components/page-header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockDonations } from '@/lib/data';
import type { Donation } from '@/lib/types';
import { LayoutDashboard, PlusCircle, Download } from 'lucide-react';
import { format } from 'date-fns';

export default function DonorDashboardPage() {
  // Assuming a logged-in donor, filter donations. For now, show all.
  const donorDonations: Donation[] = mockDonations; // .filter(d => d.donorId === 'current_user_id');

  return (
    <div className="container mx-auto">
      <PageHeader 
        title="Donor Dashboard" 
        description="Manage your food donations and track their impact."
        icon={LayoutDashboard}
        actions={
          <>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export History
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Donation
            </Button>
          </>
        }
      />
      
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableCaption>A list of your recent donations.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Food Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Date Posted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donorDonations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell className="font-medium">{donation.foodName}</TableCell>
                <TableCell>{donation.category}</TableCell>
                <TableCell>{donation.quantity}</TableCell>
                <TableCell>{format(new Date(donation.postedAt), 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <Badge 
                    variant={donation.status === 'Available' ? 'default' : (donation.status === 'Delivered' ? 'outline' : 'secondary')}
                    className={
                      donation.status === 'Available' ? 'bg-primary text-primary-foreground' : 
                      donation.status === 'Delivered' ? 'border-green-500 text-green-700 bg-green-50' : ''
                    }
                  >
                    {donation.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
            {donorDonations.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No donations found. Start by adding a new donation!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
