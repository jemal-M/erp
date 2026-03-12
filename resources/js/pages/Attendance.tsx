import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';

interface Attandance {
    id: number;
    name: string;
    email: string;
    role?: {
        name: string;
    };
    created_at: string;
}

interface AttandancesPageProps {
    Attandances: Attandance[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Attandances',
        href: '/Attandances',
    },
];

export default function Attandances({ Attandances }: AttandancesPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Attandances" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Attandances</h1>
                    <Button>Add New Attandance</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Attandances.length === 0 ? (
                        <Card className="col-span-full">
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">No Attandances found.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        Attandances.map((Attandance) => (
                            <Card key={Attandance.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>{Attandance.name}</span>
                                        <Badge variant={Attandance.role?.name === 'admin' ? 'default' : 'secondary'}>
                                            {Attandance.role?.name || 'No Role'}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Email:</span> {Attandance.email}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">ID:</span> {Attandance.id}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Created:</span> {new Date(Attandance.created_at).toLocaleDateString()}
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
