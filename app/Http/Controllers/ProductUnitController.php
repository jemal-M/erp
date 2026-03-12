<?php

namespace App\Http\Controllers;

use App\Models\ProductUnit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductUnitController extends Controller
{
    public function index()
    {
        return Inertia::render('ProductUnits/Index');
    }

    public function create()
    {
        return Inertia::render('ProductUnits/Create');
    }

    public function edit($id)
    {
        return Inertia::render('ProductUnits/Edit', [
            'id' => $id
             
        ]);
    }

    public function show($id)
    {
        return Inertia::render('ProductUnits/Show', [
            'id' => $id
        ]);
    }
  public function update(Request $request, $id){
    $request()->validate([
        'name' => 'required|string|max:255',
        
      ]);
      ProductUnit::find($id)->update($request->only('name'));
      return redirect()->route('product-units.index')->with('message', 'Product Unit Updated Successfully!');
  }

  public function store(Request $request)
  {
      $request()->validate([
          'name' => 'required|string|max:255',

        ]);
        ProductUnit::create($request->only('name'));
        return redirect()->route('product-units.index')->with('message', 'Product Unit Created Successfully!');
  }

  public function destroy($id)
  {
      ProductUnit::find($id)->delete();
      return redirect()->route('product-units.index')->with('message', 'Product Unit Deleted Successfully!');
  }
  
}
