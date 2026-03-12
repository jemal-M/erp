import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';

interface Transaction {
    id: number;
    name: string;
    email: string;
    role?: {
        name: string;
    };
    created_at: string;
}

interface TransactionsPageProps {
    Transactions: Transaction[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/Transactions',
    },
];

export default function Transactions({ Transactions }: TransactionsPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Transactions</h1>
                    <Button>Add New Transaction</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Transactions.length === 0 ? (
                        <Card className="col-span-full">
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">No Transactions found.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        Transactions.map((Transaction) => (
                            <Card key={Transaction.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>{Transaction.name}</span>
                                        <Badge variant={Transaction.role?.name === 'admin' ? 'default' : 'secondary'}>
                                            {Transaction.role?.name || 'No Role'}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Email:</span> {Transaction.email}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">ID:</span> {Transaction.id}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Created:</span> {new Date(Transaction.created_at).toLocaleDateString()}
                                        </p>
                                        <div className="flex gap-2 pt-2">
                                            <Button variant="outline" size="sm">View</Button>
                                            <Button variant="outline" size="sm">Edit</Button>
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
