"use client";

import React, { useState } from "react";
import { Gold } from "@/types/gold";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { GoldPagination } from "./BandaPagination";
import { Button } from "@/components/ui/button";

interface GoldTableProps {
  data: Gold[];
}

export default function GoldTable({ data = [] }: GoldTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const itemsPerPage = 365;

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Determine how many items to show based on the "Show All" state
  const displayedData = showAll ? currentData : currentData.slice(0, 25);

  const handleToggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-none border-0 relative group">
      <CardContent>
        <article className="mb-12">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>IDR</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedData.map((gold, index) => (
                <TableRow key={index}>
                  <TableCell>{gold.time}</TableCell>
                  <TableCell className="text-green-600 font-medium">
                    {gold.close}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-center mt-4 opacity-25 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleToggleShowAll}
              className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition"
            >
              {showAll ? "Show Less" : "See More"}
            </Button>
          </div>
        </article>
        <div className="flex items-center justify-center mt-4">
          <GoldPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </CardContent>
    </Card>
  );
}
