<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Departments/Index');

    }

    public function create()
    {
        return Inertia::render('Departments/Create');
    }
    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|unique:departments|max:255',
            'description' => 'required',

        ]);
        Department::create($validate);

        return redirect()->back();
    }

    public function show(Department $department)
    {
        return Inertia::render('Departments/Show', [
            'department' => $department
        ]);
    }
}
