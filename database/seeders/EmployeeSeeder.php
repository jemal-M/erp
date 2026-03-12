<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Designation;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hrDept = Department::where('name', 'Human Resources')->first();
        $itDept = Department::where('name', 'Information Technology')->first();
        $financeDept = Department::where('name', 'Finance')->first();

        $hrManager = Designation::where('title', 'HR Manager')->first();
        $itManager = Designation::where('title', 'IT Manager')->first();
        $financeManager = Designation::where('title', 'Finance Manager')->first();

        // Get or create users for employees
        $user1 = User::where('email', 'employee1@example.com')->first();
        if (! $user1) {
            $user1 = User::create([
                'name' => 'Budi Santoso',
                'email' => 'employee1@example.com',
                'password' => bcrypt('password'),
            ]);
        }

        $user2 = User::where('email', 'employee2@example.com')->first();
        if (! $user2) {
            $user2 = User::create([
                'name' => 'Siti Rahayu',
                'email' => 'employee2@example.com',
                'password' => bcrypt('password'),
            ]);
        }

        $user3 = User::where('email', 'employee3@example.com')->first();
        if (! $user3) {
            $user3 = User::create([
                'name' => 'Ahmad Wijaya',
                'email' => 'employee3@example.com',
                'password' => bcrypt('password'),
            ]);
        }

        Employee::insert([
            [
                'user_id' => $user1->id,
                'department_id' => $hrDept->id,
                'designation_id' => $hrManager->id,
                'position' => 'HR Manager',
                'salary' => 15000000,
                'hire_date' => '2022-01-15',
            ],
            [
                'user_id' => $user2->id,
                'department_id' => $itDept->id,
                'designation_id' => $itManager->id,
                'position' => 'IT Manager',
                'salary' => 20000000,
                'hire_date' => '2021-06-01',
            ],
            [
                'user_id' => $user3->id,
                'department_id' => $financeDept->id,
                'designation_id' => $financeManager->id,
                'position' => 'Finance Manager',
                'salary' => 18000000,
                'hire_date' => '2021-03-10',
            ],
        ]);
    }
}
