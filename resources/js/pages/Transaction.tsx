import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';
import { index as transactionsIndex, create as transactionsCreate } from '@/routes/transactions';

interface Transaction {
    id: number;
    name: string;
    amount: number;
    type: 'credit' | 'debit';
    description?: string;
    category?: string;
    date?: string;
    created_at: string;
}

interface TransactionsPageProps {
    Transactions: Transaction[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

export default function Transactions({ Transactions }: TransactionsPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Transactions</h1>
                    <Button asChild>
                        <a href={transactionsCreate.url()}>Add New Transaction</a>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Transactions.length === 0 ? (
                        <Card className="col-span-full">
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">No Transactions found.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        Transactions.map((transaction) => (
                            <Card key={transaction.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>{transaction.name}</span>
                                        <Badge variant={transaction.type === 'credit' ? 'default' : 'destructive'}>
                                            {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Amount:</span> ${transaction.amount.toFixed(2)}
                                        </p>
                                        {transaction.category && (
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-medium">Category:</span> {transaction.category}
                                            </p>
                                        )}
                                        {transaction.description && (
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-medium">Description:</span> {transaction.description}
                                            </p>
                                        )}
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Date:</span> {transaction.date ? new Date(transaction.date).toLocaleDateString() : 'N/A'}
                                        </p>
                                        <div className="flex gap-2 pt-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={`/transactions/${transaction.id}/show`}>View</a>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild>
                                                <a href={`/transactions/${transaction.id}/edit`}>Edit</a>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
