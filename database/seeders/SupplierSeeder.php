<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Supplier::insert([
            [
                'name' => 'PT Sumber Rejeki',
                'email' => 'supplier1@example.com',
                'phone' => '021-1234567',
                'address' => 'Jl. Industri Raya No. 10, Jakarta Pusat',
            ],
            [
                'name' => 'CV Maju Bersama',
                'email' => 'supplier2@example.com',
                'phone' => '021-7654321',
                'address' => 'Jl. Perdagangan No. 25, Jakarta Selatan',
            ],
            [
                'name' => 'PT Indo Supply',
                'email' => 'supplier3@example.com',
                'phone' => '022-3456789',
                'address' => 'Jl. Braga No. 50, Bandung',
            ],
            [
                'name' => 'CV Berkah Sejahtera',
                'email' => 'supplier4@example.com',
                'phone' => '031-9876543',
                'address' => 'Jl. Greges No. 15, Surabaya',
            ],
            [
                'name' => 'PT Global Trading',
                'email' => 'supplier5@example.com',
                'phone' => '061-4567890',
                'address' => 'Jl. Auditorium No. 30, Medan',
            ],
        ]);
    }
}
