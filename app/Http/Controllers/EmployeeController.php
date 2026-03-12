<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {
        return Inertia::render('Employee/Index');
    }

    public function create()
    {
        return Inertia::render('Employee/Create');
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:employees',
            'phone' => 'required|unique:employees',
            'address' => 'required'
        ]);

        Employee::create($validate);

        return redirect()->route('employee.index')->with('message', 'Employee Created Successfully');
    }

    public function edit(Employee $employee)
    {
        return Inertia::render('Employee/Edit', [
            'employee' => $employee
        ]);
    }

    public function update(Request $request, Employee $employee)
    {
        $validate = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:employees,email,'.$employee->id,
            'phone' => 'required|unique:employees,phone,'.$employee->id,
            'address' => 'required'
        ]);

        $employee->update($validate);

        return redirect()->route('employee.index')->with('message', 'Employee Updated Successfully');
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('employee.index')->with('message', 'Employee Deleted Successfully');
    }

    public function show(Employee $employee)
    {
        return Inertia::render('Employee/Show', [
            'employee' => $employee
        ]);
    }
    

}
