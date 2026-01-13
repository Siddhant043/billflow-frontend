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
    name: "Acme Corp",
    email: "billing@acme.com",
    address: "123 Tech Lane, SF",
    avatar: "https://picsum.photos/seed/acme/40/40",
  },
  {
    id: "2",
    name: "Global Designs",
    email: "hello@globaldesigns.co",
    address: "456 Art Blvd, London",
    avatar: "https://picsum.photos/seed/global/40/40",
  },
  {
    id: "3",
    name: "Stark Industries",
    email: "pepper@stark.com",
    address: "890 Malibu Way, CA",
    avatar: "https://picsum.photos/seed/stark/40/40",
  },
];
