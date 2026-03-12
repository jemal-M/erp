<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function index()
    {
        return Inertia::render("Supplier/Index");
    }

    public function create()
    {
        return Inertia::render("Supplier/Create");
    }

    public function store(Request $request)
    {
        $supplier = new Supplier();
        $supplier->name = $request->name;
        $supplier->email = $request->email;
        $supplier->phone = $request->phone;
        $supplier->address = $request->address;
        $supplier->save();

        return redirect()->back();
    }

    public function show(Supplier $supplier)
    {
         return Inertia::render("Supplier/Show", [
            'supplier' => $supplier
        ]);
    }

    public function edit(Supplier $supplier)
    {
        return Inertia::render("Supplier/Edit", [
           'supplier' => $supplier 
        ]);
    }

    public function update(Request $request, Supplier $supplier)
    {
        $supplier->name = $request->name;
        $supplier->email = $request->email;
        $supplier->phone = $request->phone;
        $supplier->address = $request->address;
        $supplier->save();

        return redirect()->back();
    }

    public function destroy(Supplier $supplier)
    {
        $supplier->delete();

        return redirect()->back();
    }
    
}
