<?php

namespace App\Http\Controllers;

use App\Models\Designation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DesignationController extends Controller
{
    public function index()
    {
        return Inertia::render('Designations/Index');
    }

    public function create()
    {
        return Inertia::render('Designations/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
        ]);

        $designation = new Designation();
        $designation->title = $request->title;
        $designation->save();

        return redirect()->route('designations.index')->with('success', 'Designation created successfully.');
    }

    public function show(Designation $designation)
    {
        return Inertia::render('Designations/Show', [
            'designation' => $designation
        ]);
    }

    public function edit(Designation $designation)
    {
        return Inertia::render('Designations/Edit', [
            'designation' => $designation
        ]);
    }

    public function update(Request $request, Designation $designation)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
        ]);

        $designation->title = $request->title;
        $designation->save();

        return redirect()->route('designations.index')->with('success', 'Designation updated successfully.');
    }

    public function destroy(Designation $designation)
    {
        $designation->delete();

        return redirect()->route('designations.index')->with('success', 'Designation deleted successfully.');
    }
    
}
