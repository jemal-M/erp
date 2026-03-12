import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';

interface Product {
    id: number;
    name: string;
    email: string;
    role?: {
        name: string;
    };
    created_at: string;
}

interface ProductsPageProps {
    products: Product[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function Product({ products }: ProductsPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Products</h1>
                    <Button>Add New Product</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.length === 0 ? (
                        <Card className="col-span-full">
                            <CardContent className="pt-6">
                                <p className="text-center text-muted-foreground">No products found.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        products.map((user) => (
                            <Card key={user.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>{user.name}</span>
                                        <Badge variant={user.role?.name === 'admin' ? 'default' : 'secondary'}>
                                            {user.role?.name || 'No Role'}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Email:</span> {user.email}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">ID:</span> {user.id}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium">Created:</span> {new Date(user.created_at).toLocaleDateString()}
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
