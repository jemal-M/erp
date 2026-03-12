<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // User Management
            ['name' => 'users.view', 'description' => 'View users list'],
            ['name' => 'users.create', 'description' => 'Create new users'],
            ['name' => 'users.edit', 'description' => 'Edit users'],
            ['name' => 'users.delete', 'description' => 'Delete users'],

            // Role Management
            ['name' => 'roles.view', 'description' => 'View roles list'],
            ['name' => 'roles.create', 'description' => 'Create new roles'],
            ['name' => 'roles.edit', 'description' => 'Edit roles'],
            ['name' => 'roles.delete', 'description' => 'Delete roles'],

            // Employee Management
            ['name' => 'employees.view', 'description' => 'View employees list'],
            ['name' => 'employees.create', 'description' => 'Create new employees'],
            ['name' => 'employees.edit', 'description' => 'Edit employees'],
            ['name' => 'employees.delete', 'description' => 'Delete employees'],

            // Product Management
            ['name' => 'products.view', 'description' => 'View products list'],
            ['name' => 'products.create', 'description' => 'Create new products'],
            ['name' => 'products.edit', 'description' => 'Edit products'],
            ['name' => 'products.delete', 'description' => 'Delete products'],

            // Inventory Management
            ['name' => 'inventory.view', 'description' => 'View inventory'],
            ['name' => 'inventory.adjust', 'description' => 'Adjust inventory'],
            ['name' => 'inventory.transfer', 'description' => 'Transfer inventory'],

            // Customer Management
            ['name' => 'customers.view', 'description' => 'View customers list'],
            ['name' => 'customers.create', 'description' => 'Create new customers'],
            ['name' => 'customers.edit', 'description' => 'Edit customers'],
            ['name' => 'customers.delete', 'description' => 'Delete customers'],

            // Supplier Management
            ['name' => 'suppliers.view', 'description' => 'View suppliers list'],
            ['name' => 'suppliers.create', 'description' => 'Create new suppliers'],
            ['name' => 'suppliers.edit', 'description' => 'Edit suppliers'],
            ['name' => 'suppliers.delete', 'description' => 'Delete suppliers'],

            // Sales Management
            ['name' => 'sales.view', 'description' => 'View sales'],
            ['name' => 'sales.create', 'description' => 'Create sales orders'],
            ['name' => 'sales.edit', 'description' => 'Edit sales orders'],
            ['name' => 'sales.cancel', 'description' => 'Cancel sales orders'],

            // Purchase Management
            ['name' => 'purchases.view', 'description' => 'View purchases'],
            ['name' => 'purchases.create', 'description' => 'Create purchase orders'],
            ['name' => 'purchases.edit', 'description' => 'Edit purchase orders'],
            ['name' => 'purchases.approve', 'description' => 'Approve purchase orders'],

            // HRM
            ['name' => 'attendance.view', 'description' => 'View attendance'],
            ['name' => 'attendance.mark', 'description' => 'Mark attendance'],
            ['name' => 'leave.view', 'description' => 'View leave requests'],
            ['name' => 'leave.approve', 'description' => 'Approve leave requests'],
            ['name' => 'payroll.view', 'description' => 'View payroll'],
            ['name' => 'payroll.manage', 'description' => 'Manage payroll'],

            // Finance
            ['name' => 'accounts.view', 'description' => 'View accounts'],
            ['name' => 'accounts.manage', 'description' => 'Manage accounts'],
            ['name' => 'transactions.view', 'description' => 'View transactions'],
            ['name' => 'transactions.create', 'description' => 'Create transactions'],
            ['name' => 'expenses.view', 'description' => 'View expenses'],
            ['name' => 'expenses.create', 'description' => 'Create expenses'],
            ['name' => 'expenses.approve', 'description' => 'Approve expenses'],

            // Reports
            ['name' => 'reports.view', 'description' => 'View reports'],
            ['name' => 'reports.export', 'description' => 'Export reports'],
            ['name' => 'reports.generate', 'description' => 'Generate reports'],

            // Settings
            ['name' => 'settings.view', 'description' => 'View settings'],
            ['name' => 'settings.manage', 'description' => 'Manage settings'],
        ];

        Permission::insert($permissions);
    }
}
