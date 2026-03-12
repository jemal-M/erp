<?php

namespace Database\Seeders;

use App\Models\ExpenseCategory;
use Illuminate\Database\Seeder;

class ExpenseCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ExpenseCategory::insert([
            ['name' => 'Office Supplies'],
            ['name' => 'Utilities'],
            ['name' => 'Rent'],
            ['name' => 'Salaries & Wages'],
            ['name' => 'Marketing & Advertising'],
            ['name' => 'Travel & Transportation'],
            ['name' => 'Equipment & Maintenance'],
            ['name' => 'Software & Subscriptions'],
            ['name' => 'Insurance'],
            ['name' => 'Taxes & Fees'],
            ['name' => 'Professional Services'],
            ['name' => 'Training & Education'],
            ['name' => 'Communication'],
            ['name' => 'Raw Materials'],
            ['name' => 'Packaging'],
            ['name' => 'Shipping & Delivery'],
            ['name' => 'Miscellaneous'],
        ]);
    }
}
