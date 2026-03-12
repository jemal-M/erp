import { Link } from '@inertiajs/react';
import {  AlignStartHorizontalIcon, ArrowUpFromDotIcon, BrickWall, BrickWallIcon, Cat, Cigarette, Circle, GraduationCap, LayoutGrid, ListOrdered, LucideBrickWall, LucideLogIn, RollerCoaster, TypeIcon, User, User2 } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
     {
        title: 'Roles',
        href: 'roles',
        icon: RollerCoaster,
    },
     {
        title: 'Permission',
        href: 'permiissions',
        icon: GraduationCap,
    },
    {
        title: 'Users',
        href: 'users',
        icon: User,
    },
        {
        title: 'Products',
        href: 'products',
        icon: Cigarette,
    },
     {
        title: 'Orders',
        href: 'orders',
        icon: ListOrdered,
    },
     {
        title: 'Department',
        href: 'department',
        icon: LayoutGrid,
    },
     {
            title: 'Transactions',
            href: 'transactions',
            icon: BrickWall,
        },
     {
        title: 'Invoices',
        href: 'invoces',
        icon: BrickWallIcon,
    },
     {
        title: 'Customers',
        href: 'customers',
        icon: User,
    },
     {
        title: 'Product category',
        href: 'categories',
        icon: Cat,
    },
     {
        title: 'Accounts',
        href: 'acounts',
        icon: LucideLogIn,
    },
     {
        title: 'Audit Logs',
        href: 'audit_logs',
        icon: ArrowUpFromDotIcon,
    },
     {
        title: 'Attandance',
        href: 'attandances',
        icon: AlignStartHorizontalIcon,
    },
     {
        title: 'Employees',
        href: 'employees',
        icon: User2,
    },
     {
        title: 'Payments',
        href: 'payments',
        icon: LucideBrickWall,
    },
  
];
export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
