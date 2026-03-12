<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Designation;
use Illuminate\Database\Seeder;

class DesignationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hrDept = Department::where('name', 'Human Resources')->first()->id;
        $itDept = Department::where('name', 'Information Technology')->first()->id;
        $financeDept = Department::where('name', 'Finance')->first()->id;
        $marketingDept = Department::where('name', 'Marketing')->first()->id;
        $salesDept = Department::where('name', 'Sales')->first()->id;

        Designation::insert([
            // HR Department
            ['title' => 'HR Manager', 'department_id' => $hrDept, 'description' => 'Manages HR department'],
            ['title' => 'HR Staff', 'department_id' => $hrDept, 'description' => 'Handles HR tasks'],
            ['title' => 'Recruiter', 'department_id' => $hrDept, 'description' => 'Handles recruitment'],

            // IT Department
            ['title' => 'IT Manager', 'department_id' => $itDept, 'description' => 'Manages IT department'],
            ['title' => 'Software Developer', 'department_id' => $itDept, 'description' => 'Develops software'],
            ['title' => 'System Administrator', 'department_id' => $itDept, 'description' => 'Manages systems'],
            ['title' => 'IT Support', 'department_id' => $itDept, 'description' => 'Provides IT support'],

            // Finance Department
            ['title' => 'Finance Manager', 'department_id' => $financeDept, 'description' => 'Manages finance department'],
            ['title' => 'Accountant', 'department_id' => $financeDept, 'description' => 'Handles accounting'],
            ['title' => 'Finance Staff', 'department_id' => $financeDept, 'description' => 'Handles finance tasks'],

            // Marketing Department
            ['title' => 'Marketing Manager', 'department_id' => $marketingDept, 'description' => 'Manages marketing department'],
            ['title' => 'Marketing Specialist', 'department_id' => $marketingDept, 'description' => 'Handles marketing tasks'],
            ['title' => 'Content Creator', 'department_id' => $marketingDept, 'description' => 'Creates content'],

            // Sales Department
            ['title' => 'Sales Manager', 'department_id' => $salesDept, 'description' => 'Manages sales department'],
            ['title' => 'Sales Representative', 'department_id' => $salesDept, 'description' => 'Handles sales'],
            ['title' => 'Sales Associate', 'department_id' => $salesDept, 'description' => 'Assists sales'],
        ]);
    }
}
