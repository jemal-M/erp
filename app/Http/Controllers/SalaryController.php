<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalaryController extends Controller
{
    public function index()
    {
        return Inertia::render('Salary/Index');
    }

    public function create()
    {
        return Inertia::render('Salary/Create');
    }

    public function show($id)
    {
        return Inertia::render('Salary/Show', [
            'salary' => $id
        ]);
    }
    public function edit($id)
    {
        return Inertia::render('Salary/Edit', [
            'salary' => $id
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:salaries',
            'salary' => 'required|integer|min:10000',
            'department' => 'required'
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $validate = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:salaries',
            'salary' => 'required|integer|min:10000',
            'department' => 'required'
        ]);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $salary = Salary::find($id);
        $salary->delete();
        return redirect()->back();
    }

    public function data()
    {
        $salary = Salary::all();
        return response()->json($salary);
    }

    public function dropdown()
    {
        $salary = Salary::select('department')->distinct()->get();
        return response()->json($salary);
    }

    public function filter(Request $request)
    {
        $salary = Salary::when($request->department, function ($query) use ($request) {
            return $query->where('department', $request->department);
        })->get();
        return response()->json($salary);
    }
    
}
