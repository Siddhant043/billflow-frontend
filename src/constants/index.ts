import type { Client } from "@/types";

export enum InvoiceStatus {
  DRAFT = "Draft",
  SENT = "Sent",
  PAID = "Paid",
  OVERDUE = "Overdue",
  CANCELLED = "Cancelled",
}

export const MOCK_CLIENTS: Client[] = [
  {
    id: "1",
    name: "Rahul Khatiwada",
    email: "billing@acme.com",
    address: "123 Tech Lane, SF",
    logoUrl: "https://picsum.photos/seed/acme/40/40",
    company: "Acme Corp",
    gstNumber: "1234567890",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
  {
    id: "2",
    name: "John Doe",
    email: "hello@globaldesigns.co",
    address: "456 Art Blvd, London",
    logoUrl: "https://picsum.photos/seed/global/40/40",
    company: "Global Designs",
    gstNumber: "1234567890",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
  {
    id: "3",
    name: "Tony Stark",
    email: "tony@stark.com",
    address: "890 Malibu Way, CA",
    logoUrl: "https://picsum.photos/seed/stark/40/40",
    company: "Stark Industries",
    gstNumber: "1234567890",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
];
