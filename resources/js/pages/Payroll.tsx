import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';

interface Payroll {
    id: number;
    name: string;
    email: string;
    role?: {
        name: string;
    };
    created_at: string;
}

interface PayrollsPageProps {
    Payrolls: Payroll[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payrolls',
        href: '/Payrolls',
    },
];

export default function Payrolls({ Payrolls }: PayrollsPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payrolls" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Payrolls</h1>
                    <Button>Add New Payroll</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Payrolls.length === 0 ? (
                        <Card className="col-span-full">
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">No Payrolls found.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        Payrolls.map((Payroll) => (
                            <Card key={Payroll.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>{Payroll.name}</span>
                                        <Badge variant={Payroll.role?.name === 'admin' ? 'default' : 'secondary'}>
                                            {Payroll.role?.name || 'No Role'}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Email:</span> {Payroll.email}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">ID:</span> {Payroll.id}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Created:</span> {new Date(Payroll.created_at).toLocaleDateString()}
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
