
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Activity, ArrowUpRight, FileBarChart, UserRound } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import { ThemeCustomizer } from './ThemeCustomizer';
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">$45,231.89</p>
              <p className="flex items-center text-xs text-muted-foreground mt-1">
                <span className="text-green-500 mr-1">+20.1%</span> from last month
              </p>
            </div>
            <div className="bg-primary/10 p-2 rounded-full">
              <FileBarChart className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">+2350</p>
                  <p className="flex items-center text-xs text-muted-foreground mt-1">
                    <span className="text-green-500 mr-1">+18.1%</span> from last month
                  </p>
                </div>
                <div className="bg-primary/10 p-2 rounded-full">
                  <UserRound className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@shadcn</h4>
              <p className="text-sm">
                User growth statistics for the month of May 2025.
              </p>
              <div className="flex items-center pt-2">
                <Button variant="link" size="sm" className="px-0 text-xs" asChild>
                  <a href="#" className="flex items-center">
                    View all users
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
              <p className="text-2xl font-bold">24.3%</p>
              <p className="flex items-center text-xs text-muted-foreground mt-1">
                <span className="text-red-500 mr-1">+5.4%</span> from last month
              </p>
            </div>
            <div className="bg-primary/10 p-2 rounded-full">
              <Activity className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4 items-center">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="-mt-0.5">
                <p className="text-sm font-medium leading-none">Alex Johnson</p>
                <p className="text-sm text-muted-foreground">Data Analyst</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <ThemeCustomizer />
              <NotificationCenter />
              <Button variant="ghost" size="icon" asChild>
                <Link to="/profile">
                  <UserRound className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHeader;
