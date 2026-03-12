<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderItemController extends Controller
{
  public function index()
  {
    return Inertia::render('OrderItems/Index');
  }

  public function create()
  {
    return Inertia::render('OrderItems/Create');
  }

  public function edit($id)
  {
    return Inertia::render('OrderItems/Edit', [
      'id' => $id
    ]);
  }
 
  public function show($id)
  {
    return Inertia::render('OrderItems/Show', [
      'id' => $id
    ]);
  }

  public function destroy($id)
  {
    return Inertia::render('OrderItems/Delete', [
      'id' => $id
    ]);
  }

  public function update(Request $request, $id)
  {
    $request->validate([
      'name' => 'required|string|max:255',
    ]);

    return Inertia::render('OrderItems/Update', [
      'id' => $id,
      'name' => $request->name
    ]);
  }
  
}
