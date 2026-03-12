import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';

interface Account {
    id: number;
    name: string;
    email: string;
    role?: {
        name: string;
    };
    created_at: string;
}

interface AccountsPageProps {
    Accounts: Account[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Accounts',
        href: '/accounts',
    },
];

export default function Accounts({ Accounts }: AccountsPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Accounts" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Accounts</h1>
                    <Button>Add New Account</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Accounts.length === 0 ? (
                        <Card className="col-span-full">
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">No Accounts found.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        Accounts.map((Account) => (
                            <Card key={Account.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>{Account.name}</span>
                                        <Badge variant={Account.role?.name === 'admin' ? 'default' : 'secondary'}>
                                            {Account.role?.name || 'No Role'}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Email:</span> {Account.email}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">ID:</span> {Account.id}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Created:</span> {new Date(Account.created_at).toLocaleDateString()}
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
