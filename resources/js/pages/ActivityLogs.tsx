import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';

interface ActivityLogs {
    id: number;
    name: string;
    email: string;
    role?: {
        name: string;
    };
    created_at: string;
}

interface ActivityLogssPageProps {
    ActivityLogss: ActivityLogs[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ActivityLogss',
        href: '/activity_logs',
    },
];

export default function ActivityLogss({ ActivityLogss }: ActivityLogssPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ActivityLogss" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">ActivityLogss</h1>
                    <Button>Add New ActivityLogs</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {ActivityLogss.length === 0 ? (
                        <Card className="col-span-full">
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">No ActivityLogss found.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        ActivityLogss.map((ActivityLogs) => (
                            <Card key={ActivityLogs.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>{ActivityLogs.name}</span>
                                        <Badge variant={ActivityLogs.role?.name === 'admin' ? 'default' : 'secondary'}>
                                            {ActivityLogs.role?.name || 'No Role'}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Email:</span> {ActivityLogs.email}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">ID:</span> {ActivityLogs.id}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Created:</span> {new Date(ActivityLogs.created_at).toLocaleDateString()}
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
