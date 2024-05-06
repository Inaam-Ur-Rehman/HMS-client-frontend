import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const columnHelper = createColumnHelper();
export const userRequestColumns = [
  columnHelper.accessor("user.name", {
    cell: (info) => info.getValue(),
    header: "User Name",
  }),
  columnHelper.accessor("user.profile.phone", {
    cell: (info) => info.getValue(),
    header: "Phone",
  }),
  columnHelper.accessor("user.room.roomNumber", {
    cell: (info) => info.getValue(),
    enableGlobalFilter: true,
    header: "Room Number",
  }),
  columnHelper.accessor("type", {
    cell: (info) => info.getValue(),
    header: "Type",
  }),
  columnHelper.accessor("status", {
    cell: (info) => (
      <Badge
        className={`${
          info.getValue() === "PENDING"
            ? "bg-red-500"
            : info.getValue() === "ASSIGNED"
            ? "bg-yellow-500"
            : "bg-green-500"
        } hover:bg-theme-green cursor-pointer`}
      >
        {info.getValue()}
      </Badge>
    ),
    header: "Status",
  }),
  columnHelper.display({
    id: "actions",
    cell: (info) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link to={`/dashboard/requests/view/${info.row.original.id}`}>
              View
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
];
