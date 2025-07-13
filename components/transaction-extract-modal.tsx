import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Transaction {
  id: string
  date: string
  clientName: string
  amount: number
  description: string
}

interface TransactionExtractModalProps {
  isOpen: boolean
  onClose: () => void
  transactions: Transaction[]
  totalAmount: number
  settlementDate: string
}

export function TransactionExtractModal({
  isOpen,
  onClose,
  transactions,
  totalAmount,
  settlementDate,
}: TransactionExtractModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Transaction Extract for Settlement on {settlementDate}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.clientName}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-between items-center font-semibold">
          <span>Total Settlement Amount:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

