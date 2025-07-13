"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
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
import { Plus, Pencil, Trash2, Copy } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface BrokerAgent {
  id: string
  name: string
  companyName: string
  code: string
  email: string
  phone: string
  commissionRate: number
  uniqueLink: string
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
  },
]

export function BrokersAgents() {
  const [brokerAgents, setBrokerAgents] = useState<BrokerAgent[]>(initialBrokerAgents)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newBrokerAgent, setNewBrokerAgent] = useState<Omit<BrokerAgent, "id" | "uniqueLink">>({
    name: "",
    companyName: "",
    code: "",
    email: "",
    phone: "",
    commissionRate: 0,
  })
  const [editingBrokerAgent, setEditingBrokerAgent] = useState<BrokerAgent | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const { name, value } = e.target
    const updateFunc = isEditing ? setEditingBrokerAgent : setNewBrokerAgent
    updateFunc((prev) => ({ ...prev, [name]: name === "commissionRate" ? Number.parseFloat(value) : value }))
  }

  const generateUniqueLink = (code: string) => {
    return `https://example.com/agent/${code}`
  }

  const handleAddBrokerAgent = () => {
    const id = (brokerAgents.length + 1).toString()
    const uniqueLink = generateUniqueLink(newBrokerAgent.code)
    setBrokerAgents((prev) => [...prev, { id, ...newBrokerAgent, uniqueLink }])
    setNewBrokerAgent({ name: "", companyName: "", code: "", email: "", phone: "", commissionRate: 0 })
    setIsAddDialogOpen(false)
  }

  const handleEditBrokerAgent = () => {
    if (editingBrokerAgent) {
      const uniqueLink = generateUniqueLink(editingBrokerAgent.code)
      setBrokerAgents((prev) =>
        prev.map((ba) => (ba.id === editingBrokerAgent.id ? { ...editingBrokerAgent, uniqueLink } : ba)),
      )
      setEditingBrokerAgent(null)
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteBrokerAgent = (id: string) => {
    setBrokerAgents((prev) => prev.filter((ba) => ba.id !== id))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied to clipboard",
          description: "The unique link has been copied to your clipboard.",
        })
      },
      (err) => {
        console.error("Could not copy text: ", err)
      },
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Brokers and Agents</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddBrokerAgent}>Add Broker/Agent</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Commission Rate</TableHead>
              <TableHead>Unique Link</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brokerAgents.map((ba) => (
              <TableRow key={ba.id}>
                <TableCell>{ba.name}</TableCell>
                <TableCell>{ba.companyName}</TableCell>
                <TableCell>{ba.code}</TableCell>
                <TableCell>{ba.email}</TableCell>
                <TableCell>{ba.phone}</TableCell>
                <TableCell>{ba.commissionRate}%</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(ba.uniqueLink)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </TableCell>
                <TableCell>
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setEditingBrokerAgent(ba)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Broker/Agent</DialogTitle>
                      </DialogHeader>
                      {editingBrokerAgent && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="edit-name"
                              name="name"
                              value={editingBrokerAgent.name}
                              onChange={(e) => handleInputChange(e, true)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-companyName" className="text-right">
                              Company Name
                            </Label>
                            <Input
                              id="edit-companyName"
                              name="companyName"
                              value={editingBrokerAgent.companyName}
                              onChange={(e) => handleInputChange(e, true)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-code" className="text-right">
                              Code
                            </Label>
                            <Input
                              id="edit-code"
                              name="code"
                              value={editingBrokerAgent.code}
                              onChange={(e) => handleInputChange(e, true)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-email" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="edit-email"
                              name="email"
                              type="email"
                              value={editingBrokerAgent.email}
                              onChange={(e) => handleInputChange(e, true)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-phone" className="text-right">
                              Phone
                            </Label>
                            <Input
                              id="edit-phone"
                              name="phone"
                              value={editingBrokerAgent.phone}
                              onChange={(e) => handleInputChange(e, true)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-commissionRate" className="text-right">
                              Commission Rate (%)
                            </Label>
                            <Input
                              id="edit-commissionRate"
                              name="commissionRate"
                              type="number"
                              value={editingBrokerAgent.commissionRate}
                              onChange={(e) => handleInputChange(e, true)}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button onClick={handleEditBrokerAgent}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the broker/agent and remove their
                          data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteBrokerAgent(ba.id)}>
                          Yes, delete broker/agent
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

