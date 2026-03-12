<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
    public function index()
    {
        return Inertia::render("PurchaseOrder/Index");
    }

    public function create()
    {
        return Inertia::render("PurchaseOrder/Create");
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required',
            'vendor' => 'required',
            'date' => 'required|date',
            'due_date' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.product' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.rate' => 'required|numeric|min:0.01',
        ]);

        // $po = PurchaseOrder::create($validate);

        return to_route("purchase-orders.index")->with("success", "Purchase Order Created!");
    }

    public function show($id)
    {
        return Inertia::render("PurchaseOrder/Show");
    }
 
    public function edit($id)
    {
        return Inertia::render("PurchaseOrder/Edit");
    }

    public function update(Request $request, $id)
    {
        $validate = $request->validate([
            'title' => 'required',
            'vendor' => 'required',
            'date' => 'required|date',
            'due_date' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.product' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.rate' => 'required|numeric|min:0.01',
        ]);

        // $po = PurchaseOrder::whereId($id)->update($validate);

        return to_route("purchase-orders.index")->with("success", "Purchase Order Updated!");
    }

    public function destroy($id)
    {
        PurchaseOrder::whereId($id)->delete();
        
        return to_route("purchase-orders.index")->with("success", "Purchase Order Deleted!");
    }
    
}
