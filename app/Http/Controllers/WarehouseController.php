<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WarehouseController extends Controller
{
    public function index()
    {
        return Inertia::render('Warehouse/Index');
    }

    public function create()
    {
        return Inertia::render('Warehouse/Create');
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        // $warehouse = Warehouse::create($validate);

        return redirect()->back();
    }

    public function show(Warehouse $warehouse)
    {
        return Inertia::render('Warehouse/Show', [
            'warehouse' => $warehouse
        ]);
    }

    public function edit(Warehouse $warehouse)
    {
        return Inertia::render('Warehouse/Edit', [
            'warehouse' => $warehouse
        ]);
    }

    public function update(Request $request, Warehouse $warehouse)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        // $warehouse->update($validate);

        return redirect()->back();
    }
}
