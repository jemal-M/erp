<?php

namespace Database\Seeders;

use App\Models\Account;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Account::insert(
            [
                [
                'name' => 'Cash',
                'type' => 'Asset',
                'balance' => 0,
            ],
            [
                'name' => 'Checking',
                'type' => 'Asset',
                'balance' => 0,
            ],
            [
                'name' => 'Savings',
                'type' => 'Asset',
                'balance' => 0,
            ],
            [
                'name' => 'Credit Card',
                'type' => 'Liability',
                'balance' => 0,
            ],
            [
                'name' => 'Loan',
                'type' => 'Liability',
                'balance' => 0,
            ],
            [
                'name' => 'Investment',
                'type' => 'Asset',
                'balance' => 0,
            ],
            [
                'name' => 'Retirement',
                'type' => 'Asset',
                'balance' => 0,
            ],
            [
                'name' => 'Mortgage',
                'type' => 'Liability',
                'balance' => 0,
            ],
            [
                'name' => 'Student Loan',
                'type' => 'Liability',
                'balance' => 0,
            ],
            [
                'name' => 'Other',
                'type' => 'Asset',
                'balance' => 0,
            ],
           ],
         
        );
    }
}
