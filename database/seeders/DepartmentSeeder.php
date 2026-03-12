<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Department::insert([
            ['name'=>'Human Resources','description'=>'HR Department'],
            ['name'=>'Information Technology','description'=>'IT Department'],
            ['name'=>'Finance','description'=>'Accounts Department'],
            ['name'=>'Marketing','description'=>'Marketing Department'],
            ['name'=>'Operations','description'=>'Operations Department'],
            ['name'=>'Research & Development','description'=>'R&D Department'],
         ['name'=>'Sales','description'=>'Sales Department'],
         ['name'=>'Customer Service','description'=>'Customer Service Department'],
         ['name'=>'Legal','description'=>'Legal Department'],
         ['name'=>'Public Relations','description'=>'PR Department'],
         ['name'=>'Procurement','description'=>'Procurement Department'],
         ['name'=>'Quality Assurance','description'=>'QA Department'],
        ]);
    }
}
