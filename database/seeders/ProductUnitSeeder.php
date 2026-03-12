<?php

namespace Database\Seeders;

use App\Models\ProductUnit;
use Illuminate\Database\Seeder;

class ProductUnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductUnit::insert([
            ['name' => 'Pcs'],
            ['name' => 'Kg'],
            ['name' => 'Gram'],
            ['name' => 'Liter'],
            ['name' => 'Ml'],
            ['name' => 'Meter'],
            ['name' => 'Cm'],
            ['name' => 'Box'],
            ['name' => 'Pack'],
            ['name' => 'Roll'],
            ['name' => 'Set'],
            ['name' => 'Unit'],
            ['name' => 'Pair'],
            ['name' => 'Dozen'],
            ['name' => 'Gross'],
        ]);
    }
}
