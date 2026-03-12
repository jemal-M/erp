<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductCategory::insert([
            ['name' => 'Electronics'],
            ['name' => 'Furniture'],
            ['name' => 'Stationery'],
            ['name' => 'Clothing'],
            ['name' => 'Food & Beverages'],
            ['name' => 'Office Supplies'],
            ['name' => 'Tools & Hardware'],
            ['name' => 'Beauty & Personal Care'],
            ['name' => 'Sports & Outdoors'],
            ['name' => 'Automotive'],
        ]);
    }
}
