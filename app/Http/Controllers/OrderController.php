<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Orders/Index');
    }

    public function show($id)
    {
        return Inertia::render('Orders/Show', [
            'id' => $id
        ]);
    }

    public function update(Request $request, $id)
    {
       $request->validate([
            'status' => 'required|string|in:pending,processing,shipped,delivered,cancelled'
        ]);
        $order = \App\Models\Order::find($id);
        $order->update($request->only('status'));
        return response()->json(['message' => 'Order updated successfully']);
    }

    public function destroy($id)
    {
        $order = \App\Models\Order::find($id);
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'status' => 'required|string|in:pending,processing,shipped,delivered,cancelled'
        ]);

        $order = \App\Models\Order::create($request->only('customer_id', 'product_id', 'quantity', 'status'));
        return response()->json(['message' => 'Order created successfully', 'order' => $order]);
    }

    public function getOrdersByCustomer($customerId)
    {
        $orders = \App\Models\Order::where('customer_id', $customerId)->get();
        return response()->json($orders);
    }

    public function getOrdersByProduct($productId)
    {
        $orders = \App\Models\Order::where('product_id', $productId)->get();
        return response()->json($orders);
    }
    
}
