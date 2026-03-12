<?php

namespace App\Http\Controllers;

use App\Models\InvoiceItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceItemController extends Controller
{
  public function index()
  {
    return Inertia::render('InvoiceItems/Index');
  }

  public function create()
  {
    return Inertia::render('InvoiceItems/Create');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => 'required|max:255',
      'price' => 'required|numeric|min:0',
    ]);
    
    InvoiceItem::create($validated);

    return redirect()->route('invoice-items.index');
  }

  public function destroy(InvoiceItem $invoiceItem)
  {
    $invoiceItem->delete();

    return redirect()->back();
  }

  public function edit(InvoiceItem $invoiceItem)
  {
    return Inertia::render('InvoiceItems/Edit', [
      'invoiceItem' => $invoiceItem,
    ]);
  }

  public function update(Request $request, InvoiceItem $invoiceItem)
  {
    $validated = $request->validate([
      'name' => 'required|max:255',
      'price' => 'required|numeric|min:0',
    ]);

    $invoiceItem->update($validated);

    return redirect()->route('invoice-items.index');
  }
  
}
