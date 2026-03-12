<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::insert([
            'name'=>'Laptop',
            'sku'=>'LAP001',
            'price'=>50000,
            'stock_quantity'=>10
        ]);

        Product::insert([
            'name'=>'Mouse',
            'sku'=>'MOU001',
            'price'=>500,
            'stock_quantity'=>50
        ]);
    }
}
