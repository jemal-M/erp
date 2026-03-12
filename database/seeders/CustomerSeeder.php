<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Customer::insert([
            [
                'name' => 'John Doe',
                'email' => 'johndoe@example.com',
                'phone' => '1234567890',
                'address' => '123 Main Street, New York, NY 10001',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'janesmith@example.com',
                'phone' => '0987654321',
                'address' => '456 Oak Avenue, Los Angeles, CA 90001',
            ],
            [
                'name' => 'Bob Johnson',
                'email' => 'bobjohnson@example.com',
                'phone' => '5555555555',
                'address' => '789 Pine Road, Chicago, IL 60601',
            ],
            [
                'name' => 'Alice Williams',
                'email' => 'alicewilliams@example.com',
                'phone' => '1111111111',
                'address' => '321 Elm Street, Houston, TX 77001',
            ],
            [
                'name' => 'Michael Brown',
                'email' => 'michaelbrown@example.com',
                'phone' => '2222222222',
                'address' => '654 Maple Drive, Phoenix, AZ 85001',
            ],
        ]);
    }
}
