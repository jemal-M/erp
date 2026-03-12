<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call seeders in order (dependencies first)
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            DepartmentSeeder::class,
            DesignationSeeder::class,
            UserSeeder::class,
            EmployeeSeeder::class,
            WarehouseSeeder::class,
            ProductCategorySeeder::class,
            ProductUnitSeeder::class,
            SupplierSeeder::class,
            CustomerSeeder::class,
            AccountSeeder::class,
            ExpenseCategorySeeder::class,
            ProductSeeder::class,
        ]);
    }
}
