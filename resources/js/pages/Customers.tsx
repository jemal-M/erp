import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';

interface Customers {
    id: number;
    name: string;
    email: string;
    role?: {
        name: string;
    };
    created_at: string;
}

interface CustomerssPageProps {
    Customerss: Customers[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customerss',
        href: '/customers',
    },

];

export default function Customers({ Customerss }: CustomerssPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customerss" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Customerss</h1>
                    <Button>Add New Customers</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Customerss.length === 0 ? (
                        <Card className="col-span-full">
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">No Customerss found.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        Customerss.map((Customers) => (
                            <Card key={Customers.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>{Customers.name}</span>
                                        <Badge variant={Customers.role?.name === 'admin' ? 'default' : 'secondary'}>
                                            {Customers.role?.name || 'No Role'}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Email:</span> {Customers.email}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">ID:</span> {Customers.id}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Created:</span> {new Date(Customers.created_at).toLocaleDateString()}
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
