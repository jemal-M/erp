<?php

namespace App\Http\Controllers;

use App\Models\InvoiceReturn;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceReturnController extends Controller
{
    public function index()
    {
        return Inertia::render("InvoiceReturn/Index");
    }

    public function create()
    {
        return Inertia::render("InvoiceReturn/Create");
    }
    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);
        $invoiceReturn = new InvoiceReturn();
        $invoiceReturn->create($validate);
        return back();
    }

    public function show(InvoiceReturn $invoiceReturn)
    {
        $invoiceReturn->load(['user']);
        $invoiceReturn->items->load(['product']);

        return Inertia::render("InvoiceReturn/Show", [
            'invoiceReturn' => $invoiceReturn
        ]);
    }

    public function edit(InvoiceReturn $invoiceReturn)
    {
        $invoiceReturn->load(['user', 'items.product']);
        $invoiceReturn->items = $invoiceReturn->items->groupBy('product.name');

        return Inertia::render("InvoiceReturn/Edit", [
            'invoiceReturn' => $invoiceReturn
        ]);
    }

    public function update(Request $request, InvoiceReturn $invoiceReturn)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);
        $invoiceReturn->update($validate);
        return back();
    }

    public function destroy(InvoiceReturn $invoiceReturn)
    {
        $invoiceReturn->delete();
        return back();
    }
    
}
