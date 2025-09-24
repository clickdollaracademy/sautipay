import type { Metadata } from "next"
import { BrokersAndAgents } from "@/components/brokers-and-agents"

export const metadata: Metadata = {
  title: "Brokers and Agents | Dashboard",
  description: "Manage your brokers and agents",
}

export default function BrokersPage() {
  return <BrokersAndAgents />
}
