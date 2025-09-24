"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Plus, Search, Trash, User, Users, FileText } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Define permission types
type Permission = "reports_only" | "refund_access" | "broker_management" | "full_access" | "settings_access"

// Define user account interface
interface UserAccount {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  permissions: Permission[]
  lastActive: string
  createdAt: string
}

// Define company interface
interface Company {
  id: string
  name: string
  users: UserAccount[]
}

export function UserAccountsTabs() {
  // Sample data for companies and their users
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "Acme Corp",
      users: [
        {
          id: "user1",
          name: "John Doe",
          email: "john@acmecorp.com",
          role: "Administrator",
          status: "active",
          permissions: ["full_access"],
          lastActive: "2023-11-15T14:30:00",
          createdAt: "2023-01-10T09:00:00",
        },
        {
          id: "user2",
          name: "Jane Smith",
          email: "jane@acmecorp.com",
          role: "Finance Manager",
          status: "active",
          permissions: ["reports_only", "refund_access"],
          lastActive: "2023-11-14T10:15:00",
          createdAt: "2023-02-15T11:30:00",
        },
        {
          id: "user3",
          name: "Robert Johnson",
          email: "robert@acmecorp.com",
          role: "Broker Manager",
          status: "active",
          permissions: ["broker_management", "reports_only"],
          lastActive: "2023-11-10T09:45:00",
          createdAt: "2023-03-20T14:00:00",
        },
      ],
    },
    {
      id: "2",
      name: "Globex Corporation",
      users: [
        {
          id: "user4",
          name: "Lisa Chen",
          email: "lisa@globex.com",
          role: "Administrator",
          status: "active",
          permissions: ["full_access"],
          lastActive: "2023-11-15T16:20:00",
          createdAt: "2023-01-05T08:30:00",
        },
        {
          id: "user5",
          name: "Michael Wong",
          email: "michael@globex.com",
          role: "Report Analyst",
          status: "active",
          permissions: ["reports_only"],
          lastActive: "2023-11-13T11:45:00",
          createdAt: "2023-04-10T10:00:00",
        },
      ],
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null)
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false)
  const { toast } = useToast()

  // Map permissions to readable descriptions
  const permissionDescriptions = {
    reports_only: "Can view and generate reports only",
    refund_access: "Can process and approve refunds",
    broker_management: "Can manage brokers and agents",
    full_access: "Full administrative access to all features",
    settings_access: "Can modify company settings",
  }

  // Function to render permission badges
  const renderPermissionBadges = (permissions: Permission[]) => {
    return permissions.map((permission) => {
      let color = "bg-gray-200"
      if (permission === "full_access") color = "bg-blue-100 text-blue-800"
      else if (permission === "reports_only") color = "bg-green-100 text-green-800"
      else if (permission === "refund_access") color = "bg-yellow-100 text-yellow-800"
      else if (permission === "broker_management") color = "bg-purple-100 text-purple-800"

      return (
        <Badge key={permission} className={`mr-1 ${color}`}>
          {permission
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Badge>
      )
    })
  }

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Add a new user to a company
  const handleAddUser = (company: Company) => {
    setSelectedCompany(company)
    setIsAddUserDialogOpen(true)
  }

  // Edit an existing user
  const handleEditUser = (company: Company, user: UserAccount) => {
    setSelectedCompany(company)
    setSelectedUser(user)
    setIsEditUserDialogOpen(true)
  }

  // Toggle user status (active/inactive)
  const toggleUserStatus = (companyId: string, userId: string) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) => {
        if (company.id === companyId) {
          return {
            ...company,
            users: company.users.map((user) => {
              if (user.id === userId) {
                const newStatus = user.status === "active" ? "inactive" : "active"
                toast({
                  title: `User ${newStatus === "active" ? "activated" : "deactivated"}`,
                  description: `${user.name}'s account is now ${newStatus}.`,
                })
                return { ...user, status: newStatus as "active" | "inactive" }
              }
              return user
            }),
          }
        }
        return company
      }),
    )
  }

  // Delete a user
  const deleteUser = (companyId: string, userId: string, userName: string) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) => {
        if (company.id === companyId) {
          return {
            ...company,
            users: company.users.filter((user) => user.id !== userId),
          }
        }
        return company
      }),
    )

    toast({
      title: "User deleted",
      description: `${userName}'s account has been removed.`,
    })
  }

  // Submit handler for adding a new user
  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle the form submission and API call here

    toast({
      title: "User added",
      description: "The new user has been added successfully.",
    })
    setIsAddUserDialogOpen(false)
  }

  // Submit handler for editing a user
  const handleEditUserSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle the form submission and API call here

    toast({
      title: "User updated",
      description: "The user details have been updated successfully.",
    })
    setIsEditUserDialogOpen(false)
    setSelectedUser(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Company User Accounts</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue={companies[0]?.id} className="w-full">
        <TabsList className="mb-4 flex w-full border-b bg-transparent p-0 h-auto">
          {companies.map((company) => (
            <TabsTrigger
              key={company.id}
              value={company.id}
              className="relative flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              <Users className="h-4 w-4" />
              {company.name}
              <Badge className="ml-1">{company.users.length}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {companies.map((company) => (
          <TabsContent key={company.id} value={company.id} className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>{company.name} - User Accounts</CardTitle>
                  <CardDescription>Manage user permissions and access levels for {company.name}</CardDescription>
                </div>
                <Button onClick={() => handleAddUser(company)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {company.users
                      .filter(
                        (user) =>
                          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.role.toLowerCase().includes(searchQuery.toLowerCase()),
                      )
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === "active" ? "success" : "secondary"}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">{renderPermissionBadges(user.permissions)}</div>
                          </TableCell>
                          <TableCell>{formatDate(user.lastActive)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditUser(company, user)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit {user.name}</span>
                              </Button>
                              <Switch
                                checked={user.status === "active"}
                                onCheckedChange={() => toggleUserStatus(company.id, user.id)}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => deleteUser(company.id, user.id, user.name)}
                              >
                                <Trash className="h-4 w-4" />
                                <span className="sr-only">Delete {user.name}</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between py-4">
                <div className="text-sm text-muted-foreground">Showing {company.users.length} users</div>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Export User List
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Add a new user account to {selectedCompany?.name}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddUserSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Input id="role" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Permissions</Label>
                <div className="col-span-3 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="reports" />
                    <Label htmlFor="reports">Run reports only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="refunds" />
                    <Label htmlFor="refunds">Process refunds</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="brokers" />
                    <Label htmlFor="brokers">Manage brokers/agents</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="settings" />
                    <Label htmlFor="settings">Access settings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="full-access" />
                    <Label htmlFor="full-access">Full administrative access</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add User</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Edit details for {selectedUser?.name}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditUserSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input id="edit-name" defaultValue={selectedUser?.name} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedUser?.email}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <Input id="edit-role" defaultValue={selectedUser?.role} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Permissions</Label>
                <div className="col-span-3 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="edit-reports" checked={selectedUser?.permissions.includes("reports_only")} />
                    <Label htmlFor="edit-reports">Run reports only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="edit-refunds" checked={selectedUser?.permissions.includes("refund_access")} />
                    <Label htmlFor="edit-refunds">Process refunds</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="edit-brokers" checked={selectedUser?.permissions.includes("broker_management")} />
                    <Label htmlFor="edit-brokers">Manage brokers/agents</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="edit-settings" checked={selectedUser?.permissions.includes("settings_access")} />
                    <Label htmlFor="edit-settings">Access settings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="edit-full-access" checked={selectedUser?.permissions.includes("full_access")} />
                    <Label htmlFor="edit-full-access">Full administrative access</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditUserDialogOpen(false)
                  setSelectedUser(null)
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
