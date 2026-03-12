import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';

interface AuditLogs {
    id: number;
    name: string;
    email: string;
    role?: {
        name: string;
    };
    created_at: string;
}

interface AuditLogssPageProps {
    AuditLogss: AuditLogs[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'AuditLogss',
        href: '/AuditLogss',
    },
];

export default function AuditLogss({ AuditLogss }: AuditLogssPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="AuditLogss" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">AuditLogss</h1>
                    <Button>Add New AuditLogs</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {AuditLogss.length === 0 ? (
                        <Card className="col-span-full">
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">No AuditLogss found.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        AuditLogss.map((AuditLogs) => (
                            <Card key={AuditLogs.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>{AuditLogs.name}</span>
                                        <Badge variant={AuditLogs.role?.name === 'admin' ? 'default' : 'secondary'}>
                                            {AuditLogs.role?.name || 'No Role'}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Email:</span> {AuditLogs.email}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">ID:</span> {AuditLogs.id}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Created:</span> {new Date(AuditLogs.created_at).toLocaleDateString()}
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
