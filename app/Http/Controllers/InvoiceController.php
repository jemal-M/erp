<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Invoice/Index');
    }

    public function create()
    {
        return Inertia::render('Invoice/Create');
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ]);

        // dd($validate);
        return to_route('invoice.index');
    }

    public function show($id)
    {
        return Inertia::render('Invoice/Show', [
            'id' => $id
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Invoice/Edit', [
            'id' => $id
        ]);
    }

    public function update(Request $request, $id)
    {
        return to_route('invoice.index');
    }

    public function destroy($id)
    {

        return to_route('invoice.index');
    }
    
}
