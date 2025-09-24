"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Building, Plus, Users } from "lucide-react"

// Define company interface
interface Company {
  id: string
  name: string
  industry: string
  userCount: number
  createdAt: string
  isMaster?: boolean
}

// Define user account interface
interface UserAccount {
  id: string
  name: string
  email: string
  companyId: string
  role: string
  isMaster: boolean
  createdAt: string
}

export function DynamicCompanyTabs() {
  // State for companies and users
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "Acme Corp",
      industry: "Technology",
      userCount: 5,
      createdAt: "2023-01-15T09:30:00",
      isMaster: true,
    },
    {
      id: "2",
      name: "Globex Corporation",
      industry: "Finance",
      userCount: 3,
      createdAt: "2023-02-20T14:45:00",
    },
    {
      id: "3",
      name: "Initech",
      industry: "Insurance",
      userCount: 7,
      createdAt: "2023-03-10T11:15:00",
    },
  ])

  const [users, setUsers] = useState<UserAccount[]>([
    {
      id: "user1",
      name: "John Doe",
      email: "john@acmecorp.com",
      companyId: "1",
      role: "Administrator",
      isMaster: true,
      createdAt: "2023-01-15T09:30:00",
    },
    {
      id: "user2",
      name: "Jane Smith",
      email: "jane@acmecorp.com",
      companyId: "1",
      role: "Manager",
      isMaster: false,
      createdAt: "2023-01-16T10:45:00",
    },
  ])

  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Function to add a new company
  const handleAddCompany = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const industry = formData.get("industry") as string

    // In a real app, this would be an API call
    setTimeout(() => {
      const newCompany: Company = {
        id: `company-${Date.now()}`,
        name,
        industry,
        userCount: 1, // Start with the master account
        createdAt: new Date().toISOString(),
      }

      setCompanies((prev) => [...prev, newCompany])

      // Create master user for this company
      const masterUser: UserAccount = {
        id: `user-${Date.now()}`,
        name: "Master Account",
        email: `admin@${name.toLowerCase().replace(/\s/g, "")}.com`,
        companyId: newCompany.id,
        role: "Administrator",
        isMaster: true,
        createdAt: new Date().toISOString(),
      }

      setUsers((prev) => [...prev, masterUser])

      toast({
        title: "Company created",
        description: `${name} has been added with a master account.`,
      })

      setLoading(false)
      setIsAddCompanyOpen(false)
    }, 1000)
  }

  // Function to add a new user to a company
  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedCompany) return

    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as string

    // In a real app, this would be an API call
    setTimeout(() => {
      const newUser: UserAccount = {
        id: `user-${Date.now()}`,
        name,
        email,
        companyId: selectedCompany.id,
        role,
        isMaster: false,
        createdAt: new Date().toISOString(),
      }

      setUsers((prev) => [...prev, newUser])

      // Update company user count
      setCompanies((prev) =>
        prev.map((company) =>
          company.id === selectedCompany.id ? { ...company, userCount: company.userCount + 1 } : company,
        ),
      )

      toast({
        title: "User added",
        description: `${name} has been added to ${selectedCompany.name}.`,
      })

      setLoading(false)
      setIsAddUserOpen(false)
    }, 1000)
  }

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Company Management</h2>
        <Button onClick={() => setIsAddCompanyOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      <Tabs defaultValue={companies[0]?.id} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="flex w-auto overflow-x-auto bg-transparent p-0 h-auto">
            {companies.map((company) => (
              <TabsTrigger
                key={company.id}
                value={company.id}
                className="relative flex items-center gap-2 rounded-md px-4 py-2 text-muted-foreground hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Building className="h-4 w-4" />
                {company.name}
                {company.isMaster && (
                  <Badge variant="outline" className="ml-1 border-yellow-500 text-yellow-500">
                    Master
                  </Badge>
                )}
                <Badge className="ml-1">{company.userCount}</Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {companies.map((company) => (
          <TabsContent key={company.id} value={company.id} className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>{company.name}</CardTitle>
                  <CardDescription>
                    {company.industry} • Created on {formatDate(company.createdAt)}
                  </CardDescription>
                </div>
                <Button
                  onClick={() => {
                    setSelectedCompany(company)
                    setIsAddUserOpen(true)
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Company Users</h3>
                    <p className="text-sm text-muted-foreground">
                      {company.userCount} user{company.userCount !== 1 ? "s" : ""} in this company
                    </p>
                  </div>

                  <div className="border rounded-md">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left font-medium">Name</th>
                          <th className="px-4 py-2 text-left font-medium">Email</th>
                          <th className="px-4 py-2 text-left font-medium">Role</th>
                          <th className="px-4 py-2 text-left font-medium">Status</th>
                          <th className="px-4 py-2 text-left font-medium">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users
                          .filter((user) => user.companyId === company.id)
                          .map((user) => (
                            <tr key={user.id} className="border-b">
                              <td className="px-4 py-2">
                                {user.name}
                                {user.isMaster && (
                                  <Badge variant="outline" className="ml-2 border-yellow-500 text-yellow-500">
                                    Master
                                  </Badge>
                                )}
                              </td>
                              <td className="px-4 py-2">{user.email}</td>
                              <td className="px-4 py-2">{user.role}</td>
                              <td className="px-4 py-2">
                                <Badge variant="success">Active</Badge>
                              </td>
                              <td className="px-4 py-2">{formatDate(user.createdAt)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Company Settings</Button>
                <Button variant="outline" className="text-destructive hover:bg-destructive/10">
                  Delete Company
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Add Company Dialog */}
      <Dialog open={isAddCompanyOpen} onOpenChange={setIsAddCompanyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Company</DialogTitle>
            <DialogDescription>
              Create a new company with a master account. The master account will be used to manage other accounts.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddCompany}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Company Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" name="industry" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddCompanyOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Company"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User to {selectedCompany?.name}</DialogTitle>
            <DialogDescription>Add a new user account to this company.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddUser}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" name="role" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
