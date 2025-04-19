"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, FilterIcon, Search, SlidersHorizontal } from "lucide-react";

function RecordingsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // This is just placeholder data - the actual implementation would fetch from your backend
  const recordings = [
    {
      id: "1",
      title: "Frontend Developer Interview",
      date: "Apr 15, 2025",
      duration: "45 min",
      candidate: "Alex Johnson",
    },
    {
      id: "2",
      title: "Full Stack Engineer Interview",
      date: "Apr 12, 2025",
      duration: "60 min",
      candidate: "Maria Garcia",
    },
    {
      id: "3",
      title: "React Developer Coding Test",
      date: "Apr 10, 2025",
      duration: "52 min",
      candidate: "David Chen",
    },
    {
      id: "4",
      title: "Senior Developer Technical Assessment",
      date: "Apr 08, 2025",
      duration: "65 min",
      candidate: "Sarah Miller",
    },
  ];

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-8">
      <div className="bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent rounded-lg p-8 border shadow-sm">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Clock className="h-7 w-7 text-orange-500" />
          <span>Interview Recordings</span>
        </h1>
        <p className="text-muted-foreground">
          Access and review all your past interview recordings
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recordings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 focus-visible:ring-orange-500/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm" className="flex gap-2 group">
            <FilterIcon className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex gap-2 group">
            <SlidersHorizontal className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Sort
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {recordings.map((recording) => (
          <Card
            key={recording.id}
            className="group overflow-hidden border transition-all hover:shadow-md hover:border-orange-500/20"
          >
            <CardHeader className="bg-gradient-to-r from-orange-500/5 to-transparent p-6">
              <CardTitle className="text-xl group-hover:text-orange-500 transition-colors">
                {recording.title}
              </CardTitle>
              <CardDescription className="flex justify-between mt-2">
                <span>{recording.date}</span>
                <span className="font-medium">{recording.duration}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Candidate:</p>
                <p className="font-medium">{recording.candidate}</p>
              </div>
              <Button
                className="bg-orange-500 hover:bg-orange-600 transition-all"
                size="sm"
              >
                View Recording
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {recordings.length === 0 && (
        <div className="text-center p-12">
          <div className="bg-muted rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No recordings found</h3>
          <p className="text-muted-foreground">
            Complete an interview to see recordings here
          </p>
        </div>
      )}
    </div>
  );
}

export default RecordingsPage;
