<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Products/Index');
    }
    public function create()
    {
        return Inertia::render('Products/Create');
    }
    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
        ]);
     
        return Inertia::render('Products/Show', ['product' => $validate]);
    }
    public function show($id)
    {
        return Inertia::render('Products/Show', ['product' => [
            'id' => $id,
            'name' => 'Test Product',
            'price' => 999,
        ]]);
    }
    public function edit($id)
    {
        return Inertia::render('Products/Edit', ['product' => [
            'id' => $id,
            'name' => 'Test Product',
            'price' => 999,
        ]]);
    }
    public function update(Request $request, $id)
    {
        $validate = $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
        ]);

        return Inertia::render('Products/Show', ['product' => array_merge($validate, ['id' => $id])]);
    }
    public function destroy($id)
    {
        return Inertia::render('Products/Index');
    }
    
}
