"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, Copy, Search, X, ExternalLink } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BrokerAgent {
  id: string
  name: string
  companyName: string
  code: string
  email: string
  phone: string
  commissionRate: number
  uniqueLink: string
  status: "Active" | "Inactive"
}

const initialBrokerAgents: BrokerAgent[] = [
  {
    id: "1",
    name: "John Doe",
    companyName: "Doe Insurance",
    code: "JD001",
    email: "john@example.com",
    phone: "123-456-7890",
    commissionRate: 5,
    uniqueLink: "https://example.com/agent/JD001",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    companyName: "Smith Brokers",
    code: "JS002",
    email: "jane@example.com",
    phone: "098-765-4321",
    commissionRate: 4.5,
    uniqueLink: "https://example.com/agent/JS002",
    status: "Active",
  },
  {
    id: "3",
    name: "Bob Johnson",
    companyName: "Johnson & Co",
    code: "BJ003",
    email: "bob@example.com",
    phone: "555-555-5555",
    commissionRate: 6,
    uniqueLink: "https://example.com/agent/BJ003",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Alice Williams",
    companyName: "Williams Insurance",
    code: "AW004",
    email: "alice@example.com",
    phone: "444-333-2222",
    commissionRate: 5.5,
    uniqueLink: "https://example.com/agent/AW004",
    status: "Active",
  },
  {
    id: "5",
    name: "Charlie Brown",
    companyName: "Brown & Associates",
    code: "CB005",
    email: "charlie@example.com",
    phone: "111-222-3333",
    commissionRate: 4.8,
    uniqueLink: "https://example.com/agent/CB005",
    status: "Active",
  },
]

export function BrokersAndAgents() {
  const [brokerAgents, setBrokerAgents] = useState<BrokerAgent[]>(initialBrokerAgents)
  const [filteredAgents, setFilteredAgents] = useState<BrokerAgent[]>(initialBrokerAgents)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<{ [key: string]: boolean }>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [newBrokerAgent, setNewBrokerAgent] = useState<Omit<BrokerAgent, "id" | "uniqueLink" | "status">>({
    name: "",
    companyName: "",
    code: "",
    email: "",
    phone: "",
    commissionRate: 5,
  })
  const [editingBrokerAgent, setEditingBrokerAgent] = useState<{ [key: string]: BrokerAgent }>({})
  const editFormRefs = useRef<{ [key: string]: HTMLFormElement | null }>({})
  const [showAffiliateDialog, setShowAffiliateDialog] = useState<{ [key: string]: boolean }>({})
  const [affiliateLinks, setAffiliateLinks] = useState<{ [key: string]: string }>({})

  // Apply filters whenever search query or status filter changes
  useEffect(() => {
    let result = [...brokerAgents]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (agent) =>
          agent.name.toLowerCase().includes(query) ||
          agent.companyName.toLowerCase().includes(query) ||
          agent.code.toLowerCase().includes(query) ||
          agent.email.toLowerCase().includes(query),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((agent) => agent.status.toLowerCase() === statusFilter.toLowerCase())
    }

    setFilteredAgents(result)
  }, [searchQuery, statusFilter, brokerAgents])

  // Generate affiliate links for all agents
  useEffect(() => {
    const links: { [key: string]: string } = {}
    brokerAgents.forEach((agent) => {
      links[agent.id] = generateAffiliateLink(agent.code)
    })
    setAffiliateLinks(links)
  }, [brokerAgents])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, agentId: string) => {
    const { name, value } = e.target

    setEditingBrokerAgent((prev) => ({
      ...prev,
      [agentId]: {
        ...prev[agentId],
        [name]: name === "commissionRate" ? Number.parseFloat(value) : value,
      },
    }))
  }

  const generateUniqueLink = (code: string) => {
    return `https://example.com/agent/${code}`
  }

  const generateAffiliateLink = (code: string) => {
    // Create a proper affiliate link with the broker code embedded
    // This would typically point to your homepage with a referral parameter
    return `https://example.com/?ref=${code}`
  }

  const handleAddBrokerAgent = () => {
    // Basic validation
    if (!newBrokerAgent.name || !newBrokerAgent.email || !newBrokerAgent.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Generate a unique ID and code if not provided
    const id = (brokerAgents.length + 1).toString()
    const code = newBrokerAgent.code || `BA${id.padStart(3, "0")}`
    const uniqueLink = generateUniqueLink(code)

    // Add the new broker/agent
    setBrokerAgents((prev) => [
      ...prev,
      {
        id,
        ...newBrokerAgent,
        code,
        uniqueLink,
        status: "Active",
      },
    ])

    // Reset form
    setNewBrokerAgent({
      name: "",
      companyName: "",
      code: "",
      email: "",
      phone: "",
      commissionRate: 5,
    })

    // Close dialog
    setIsAddDialogOpen(false)

    // Show success message
    toast({
      title: "Broker Added",
      description: "The broker has been added successfully.",
    })
  }

  const openEditDialog = (agent: BrokerAgent) => {
    // Create a deep copy of the agent to edit
    setEditingBrokerAgent((prev) => ({
      ...prev,
      [agent.id]: { ...agent },
    }))

    // Open the dialog for this specific agent
    setIsEditDialogOpen((prev) => ({
      ...prev,
      [agent.id]: true,
    }))
  }

  const closeEditDialog = (agentId: string) => {
    // Close the dialog for this specific agent
    setIsEditDialogOpen((prev) => ({
      ...prev,
      [agentId]: false,
    }))

    // Optional: clear the editing state for this agent
    setEditingBrokerAgent((prev) => {
      const newState = { ...prev }
      delete newState[agentId]
      return newState
    })
  }

  const handleEditBrokerAgent = (agentId: string) => {
    const agent = editingBrokerAgent[agentId]
    if (!agent) return

    // Basic validation
    if (!agent.name || !agent.email || !agent.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const uniqueLink = generateUniqueLink(agent.code)

    // Update the broker/agent in the list
    setBrokerAgents((prev) => prev.map((ba) => (ba.id === agentId ? { ...agent, uniqueLink } : ba)))

    // Close dialog and reset state
    closeEditDialog(agentId)

    // Show success message
    toast({
      title: "Broker Updated",
      description: `${agent.name} has been updated successfully.`,
    })
  }

  const handleDeleteBrokerAgent = (id: string) => {
    // Remove the agent from the main list
    setBrokerAgents((prev) => prev.filter((ba) => ba.id !== id))

    // The filtered list will be updated automatically via the useEffect
  }

  const handleToggleStatus = (id: string) => {
    setBrokerAgents((prev) =>
      prev.map((ba) => {
        if (ba.id === id) {
          const newStatus = ba.status === "Active" ? "Inactive" : "Active"
          return { ...ba, status: newStatus }
        }
        return ba
      }),
    )

    // Find the agent to get the name for the toast
    const agent = brokerAgents.find((ba) => ba.id === id)

    toast({
      title: `Status Updated`,
      description: `${agent?.name || "Broker"}'s status has been updated successfully.`,
    })
  }

  const copyToClipboard = (text: string, agentName: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Affiliate Link Copied",
          description: `${agentName}'s affiliate link has been copied to your clipboard. Any sales through this link will be attributed to this broker.`,
        })
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast({
          title: "Copy failed",
          description: "Failed to copy the affiliate link to clipboard.",
          variant: "destructive",
        })
      },
    )
  }

  const openAffiliateDialog = (agentId: string) => {
    setShowAffiliateDialog((prev) => ({
      ...prev,
      [agentId]: true,
    }))
  }

  const closeAffiliateDialog = (agentId: string) => {
    setShowAffiliateDialog((prev) => ({
      ...prev,
      [agentId]: false,
    }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Brokers and Agents</h1>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Brokers and Agents</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Broker/Agent
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Broker/Agent</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newBrokerAgent.name}
                    onChange={(e) => {
                      const { name, value } = e.target
                      setNewBrokerAgent((prev) => ({
                        ...prev,
                        [name]: value,
                      }))
                    }}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="companyName" className="text-right">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={newBrokerAgent.companyName}
                    onChange={(e) => {
                      const { name, value } = e.target
                      setNewBrokerAgent((prev) => ({
                        ...prev,
                        [name]: value,
                      }))
                    }}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">
                    Code
                  </Label>
                  <Input
                    id="code"
                    name="code"
                    value={newBrokerAgent.code}
                    onChange={(e) => {
                      const { name, value } = e.target
                      setNewBrokerAgent((prev) => ({
                        ...prev,
                        [name]: value,
                      }))
                    }}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newBrokerAgent.email}
                    onChange={(e) => {
                      const { name, value } = e.target
                      setNewBrokerAgent((prev) => ({
                        ...prev,
                        [name]: value,
                      }))
                    }}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={newBrokerAgent.phone}
                    onChange={(e) => {
                      const { name, value } = e.target
                      setNewBrokerAgent((prev) => ({
                        ...prev,
                        [name]: value,
                      }))
                    }}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="commissionRate" className="text-right">
                    Commission Rate (%)
                  </Label>
                  <Input
                    id="commissionRate"
                    name="commissionRate"
                    type="number"
                    value={newBrokerAgent.commissionRate}
                    onChange={(e) => {
                      const { name, value } = e.target
                      setNewBrokerAgent((prev) => ({
                        ...prev,
                        [name]: name === "commissionRate" ? Number.parseFloat(value) : value,
                      }))
                    }}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddBrokerAgent}>Add Broker/Agent</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search brokers..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-9 w-9 p-0"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear</span>
                </Button>
              )}
            </div>
            <div className="w-full md:w-[200px]">
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Commission Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No brokers or agents found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAgents.map((ba) => (
                    <TableRow key={ba.id}>
                      <TableCell>{ba.name}</TableCell>
                      <TableCell>{ba.companyName}</TableCell>
                      <TableCell>{ba.code}</TableCell>
                      <TableCell>{ba.email}</TableCell>
                      <TableCell>
                        <a href={`tel:${ba.phone}`} className="flex items-center text-primary hover:underline">
                          {ba.phone}
                          <span className="ml-2 h-2 w-2 rounded-full bg-green-500" title="Active"></span>
                        </a>
                      </TableCell>
                      <TableCell>{ba.commissionRate}%</TableCell>
                      <TableCell>
                        <Badge variant={ba.status === "Active" ? "success" : "secondary"}>{ba.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {/* Affiliate Link Button */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => openAffiliateDialog(ba.id)}
                                  className="h-8 w-8 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
                                >
                                  <ExternalLink className="h-4 w-4 text-blue-500" />
                                  <span className="sr-only">Affiliate Link</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Generate affiliate link</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <Dialog
                            open={!!showAffiliateDialog[ba.id]}
                            onOpenChange={(open) => {
                              if (open) {
                                openAffiliateDialog(ba.id)
                              } else {
                                closeAffiliateDialog(ba.id)
                              }
                            }}
                          >
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Affiliate Link for {ba.name}</DialogTitle>
                              </DialogHeader>
                              <div className="py-4">
                                <p className="text-sm text-muted-foreground mb-4">
                                  Use this link to track sales attributed to {ba.name}. Any customer who visits your
                                  site through this link will have their purchases credited to this broker.
                                </p>
                                <div className="flex items-center gap-2">
                                  <Input
                                    value={affiliateLinks[ba.id] || generateAffiliateLink(ba.code)}
                                    readOnly
                                    className="font-mono text-sm"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      copyToClipboard(affiliateLinks[ba.id] || generateAffiliateLink(ba.code), ba.name)
                                    }
                                  >
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy
                                  </Button>
                                </div>
                                <div className="mt-4 p-4 bg-muted rounded-md">
                                  <h4 className="font-medium mb-2">Preview:</h4>
                                  <div className="flex items-center justify-between bg-card p-3 rounded border">
                                    <div>
                                      <p className="font-medium">Home Page with {ba.name}'s Referral</p>
                                      <p className="text-sm text-muted-foreground">Commission: {ba.commissionRate}%</p>
                                    </div>
                                    <Badge variant="outline">{ba.code}</Badge>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={() => closeAffiliateDialog(ba.id)}>Close</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {/* Edit Button */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 border-primary hover:bg-primary/10"
                                  title="Edit broker/agent details"
                                  onClick={() => openEditDialog(ba)}
                                >
                                  <Pencil className="h-4 w-4 text-primary" />
                                  <span className="sr-only">Edit {ba.name}</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit broker details</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <Dialog
                            open={!!isEditDialogOpen[ba.id]}
                            onOpenChange={(open) => {
                              if (!open) {
                                closeEditDialog(ba.id)
                              }
                            }}
                          >
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Edit Broker/Agent Details</DialogTitle>
                              </DialogHeader>
                              {editingBrokerAgent[ba.id] && (
                                <form
                                  ref={(ref) => (editFormRefs.current[ba.id] = ref)}
                                  onSubmit={(e) => {
                                    e.preventDefault()
                                    handleEditBrokerAgent(ba.id)
                                  }}
                                  className="grid gap-4 py-4"
                                >
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor={`edit-name-${ba.id}`} className="text-right">
                                      Name
                                    </Label>
                                    <Input
                                      id={`edit-name-${ba.id}`}
                                      name="name"
                                      value={editingBrokerAgent[ba.id].name}
                                      onChange={(e) => handleInputChange(e, ba.id)}
                                      className="col-span-3"
                                      required
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor={`edit-companyName-${ba.id}`} className="text-right">
                                      Company Name
                                    </Label>
                                    <Input
                                      id={`edit-companyName-${ba.id}`}
                                      name="companyName"
                                      value={editingBrokerAgent[ba.id].companyName}
                                      onChange={(e) => handleInputChange(e, ba.id)}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor={`edit-code-${ba.id}`} className="text-right">
                                      Code
                                    </Label>
                                    <Input
                                      id={`edit-code-${ba.id}`}
                                      name="code"
                                      value={editingBrokerAgent[ba.id].code}
                                      onChange={(e) => handleInputChange(e, ba.id)}
                                      className="col-span-3"
                                      required
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor={`edit-email-${ba.id}`} className="text-right">
                                      Email
                                    </Label>
                                    <Input
                                      id={`edit-email-${ba.id}`}
                                      name="email"
                                      type="email"
                                      value={editingBrokerAgent[ba.id].email}
                                      onChange={(e) => handleInputChange(e, ba.id)}
                                      className="col-span-3"
                                      required
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor={`edit-phone-${ba.id}`} className="text-right">
                                      Phone
                                    </Label>
                                    <Input
                                      id={`edit-phone-${ba.id}`}
                                      name="phone"
                                      value={editingBrokerAgent[ba.id].phone}
                                      onChange={(e) => handleInputChange(e, ba.id)}
                                      className="col-span-3"
                                      required
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor={`edit-commissionRate-${ba.id}`} className="text-right">
                                      Commission Rate (%)
                                    </Label>
                                    <Input
                                      id={`edit-commissionRate-${ba.id}`}
                                      name="commissionRate"
                                      type="number"
                                      value={editingBrokerAgent[ba.id].commissionRate}
                                      onChange={(e) => handleInputChange(e, ba.id)}
                                      className="col-span-3"
                                      min="0"
                                      max="100"
                                      step="0.1"
                                      required
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor={`edit-status-${ba.id}`} className="text-right">
                                      Status
                                    </Label>
                                    <select
                                      id={`edit-status-${ba.id}`}
                                      name="status"
                                      value={editingBrokerAgent[ba.id].status}
                                      onChange={(e) => {
                                        setEditingBrokerAgent((prev) => ({
                                          ...prev,
                                          [ba.id]: {
                                            ...prev[ba.id],
                                            status: e.target.value as "Active" | "Inactive",
                                          },
                                        }))
                                      }}
                                      className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
                                    >
                                      <option value="Active">Active</option>
                                      <option value="Inactive">Inactive</option>
                                    </select>
                                  </div>
                                </form>
                              )}
                              <DialogFooter>
                                <Button variant="outline" onClick={() => closeEditDialog(ba.id)}>
                                  Cancel
                                </Button>
                                <Button
                                  type="submit"
                                  onClick={() => {
                                    if (editFormRefs.current[ba.id]) {
                                      // Trigger form validation
                                      if (editFormRefs.current[ba.id]?.reportValidity()) {
                                        handleEditBrokerAgent(ba.id)
                                        toast({
                                          title: "Broker Updated",
                                          description: `${editingBrokerAgent[ba.id]?.name || "Broker"}'s details have been updated successfully.`,
                                        })
                                      }
                                    } else {
                                      handleEditBrokerAgent(ba.id)
                                    }
                                  }}
                                >
                                  Save Changes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {/* Status Toggle Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              handleToggleStatus(ba.id)
                            }}
                            title={ba.status === "Active" ? "Deactivate broker/agent" : "Activate broker/agent"}
                            className="px-2"
                          >
                            <Badge
                              variant={ba.status === "Active" ? "destructive" : "success"}
                              className="cursor-pointer"
                            >
                              {ba.status === "Active" ? "Deactivate" : "Activate"}
                            </Badge>
                          </Button>

                          {/* Delete Button */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:bg-destructive/10 h-8 w-8"
                                title="Delete broker/agent"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete {ba.name}</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this broker/agent? This action cannot be undone and
                                  will permanently remove their data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    handleDeleteBrokerAgent(ba.id)
                                    toast({
                                      title: "Broker Deleted",
                                      description: `${ba.name} has been removed successfully.`,
                                    })
                                  }}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredAgents.length} of {brokerAgents.length} brokers and agents
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

