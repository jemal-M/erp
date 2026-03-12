<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * This migration adds all foreign keys after all tables are created.
     */
    public function up(): void
    {
        // Users -> Roles (need to add role_id column first, then add constraint)
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('role_id')->nullable()->after('id');
            $table->foreign('role_id')->references('id')->on('roles')->cascadeOnDelete();
        });

        // Products -> Categories, Units, Warehouses (columns already added by 070003, just add constraints)
        Schema::table('products', function (Blueprint $table) {
            $table->foreign('product_category_id')->references('id')->on('product_categories')->cascadeOnDelete();
            $table->foreign('product_unit_id')->references('id')->on('product_units')->cascadeOnDelete();
            $table->foreign('warehouse_id')->references('id')->on('warehouses')->cascadeOnDelete();
        });

        // Designations -> Departments
        Schema::table('designations', function (Blueprint $table) {
            $table->foreign('department_id')->references('id')->on('departments')->cascadeOnDelete();
        });

        // Expenses -> Expense Categories (column already added by 070003)
        Schema::table('expenses', function (Blueprint $table) {
            $table->foreign('expense_category_id')->references('id')->on('expense_categories')->cascadeOnDelete();
        });

        // Purchase Orders -> Suppliers (foreign key already added by create_purchase_orders_table, skip)

        // Notifications -> Users (foreign key already added by 070001, skip)
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Users - drop foreign key and column
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn(['role_id']);
        });

        // Employees - drop foreign keys only (columns were added by 070002)
        Schema::table('employees', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['department_id']);
            $table->dropForeign(['designation_id']);
        });

        // Products - drop both foreign keys and columns (columns were added by 070003)
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['product_category_id']);
            $table->dropForeign(['product_unit_id']);
            $table->dropForeign(['warehouse_id']);
            $table->dropColumn(['product_category_id', 'product_unit_id', 'warehouse_id']);
        });

        // Designations - drop foreign key and column (column was added in create_designations_table)
        Schema::table('designations', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropColumn(['department_id', 'description']);
        });

        // Purchase Orders - skip (foreign key was added by create_purchase_orders_table)

        // Expenses - drop both foreign key and column (column was added by 070003)
        Schema::table('expenses', function (Blueprint $table) {
            $table->dropForeign(['expense_category_id']);
            $table->dropColumn(['expense_category_id']);
        });

        // Notifications - skip (foreign key was added by 070001)
    }
};
