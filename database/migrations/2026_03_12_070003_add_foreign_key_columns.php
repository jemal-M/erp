<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Add foreign key columns to tables that need them.
     */
    public function up(): void
    {
        // Products - add foreign key columns
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedBigInteger('product_category_id')->nullable();
            $table->unsignedBigInteger('product_unit_id')->nullable();
            $table->unsignedBigInteger('warehouse_id')->nullable();
        });

        // Expenses - add foreign key column
        Schema::table('expenses', function (Blueprint $table) {
            $table->unsignedBigInteger('expense_category_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['product_category_id', 'product_unit_id', 'warehouse_id']);
        });

        Schema::table('expenses', function (Blueprint $table) {
            $table->dropColumn(['expense_category_id']);
        });
    }
};
