<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('ProductCategories/Index');
    }

    public function create()
    {
        return Inertia::render('ProductCategories/Create');
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        ProductCategory::create($validate);

        return redirect()->route('product-categories.index');
    }

    public function destroy(ProductCategory $productCategory)
    {
        $productCategory->delete();

        return redirect()->back();
    }

    public function edit(ProductCategory $productCategory)
    {
        return Inertia::render('ProductCategories/Edit', [
            'productCategory' => $productCategory
        ]);
    }

    public function update(Request $request, ProductCategory $productCategory)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $productCategory->update($validate);

        return redirect()->route('product-categories.index');
    }
    
}
