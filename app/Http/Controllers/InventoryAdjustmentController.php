<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryAdjustmentController extends Controller
{
    public function index()
    {
        return Inertia::render('InventoryAdjustment/Index');
    }

    public function create()
    {
        return Inertia::render('InventoryAdjustment/Create');
    }

    public function edit($id)
    {
        return Inertia::render('InventoryAdjustment/Edit', [
            'id' => $id
        ]);
    }
    public function  show($id)
    {
        return Inertia::render('InventoryAdjustment/Show', [
            'id' => $id
        ]);
    }

    public function destroy($id)
    {
        return Inertia::render('InventoryAdjustment/Delete', [
            'id' => $id
        ]);
    }
    public function update(Request $request, $id)
    {
      Inertia::render('InventoryAdjustment/Edit', [
            'id' => $id
        ]);
        return redirect()->back();
    }

    public function store(Request $request)
    {
        Inertia::render('InventoryAdjustment/Create');
        return redirect()->back();
    }

    public function search(Request $request)
    {
        $search = $request->get('search');
        $inventoryadjustment = \App\Models\InventoryAdjustment::where('product_name', 'like', "%$search%")->get();
        return response()->json($inventoryadjustment);
    }

    public function list()
    {
        $inventoryadjustment = \App\Models\InventoryAdjustment::all();
        return response()->json($inventoryadjustment);
    }

    public function getProductInfo($id)
    {
        $product = \App\Models\Product::find($id);
        if ($product) {
            return response()->json([
                'product_name' => $product->product_name,
                'description' => $product->description,
                'price' => $product->price,
                'quantity' => $product->quantity,
            ]);
        } else {
            return response()->json(['error' => 'Product not found'], 404);
        }
    }

    public function getProducts()
    {
        $products = \App\Models\Product::select('id', 'product_name')->get();
        return response()->json($products);
    }

    public function getInventoryAdjustmentById($id)
    {
        $inventoryadjustment = \App\Models\InventoryAdjustment::find($id);
        if ($inventoryadjustment) {
            return response()->json($inventoryadjustment);
        } else {
            return response()->json(['error' => 'InventoryAdjustment not found'], 404);
        }
    }

    public function getInventoryAdjustmentsWithProductNames()
    {
        $inventoryadjustments = \App\Models\InventoryAdjustment::join('products', 'inventory_adjustments.product_id', '=', 'products.id')
            ->select('inventory_adjustments.*', 'products.product_name')
            ->get();
        return response()->json($inventoryadjustments);
    }

    public function getInventoryAdjustmentReport()
    {
        $inventoryadjustments = \App\Models\InventoryAdjustment::with('product')->get();
        return response()->json($inventoryadjustments);
    }

    public function getInventoryAdjustmentReportPDF()
    {
        $inventoryadjustments = \App\Models\InventoryAdjustment::with('product')->get();
        $pdf = \PDF::loadView('InventoryAdjustment.report', compact('inventoryadjustments'));
        return $pdf->download('inventoryadjustment-report.pdf');
    }

    public function getInventoryAdjustmentReportExcel()
    {
        $inventoryadjustments = \App\Models\InventoryAdjustment::with('product')->get();
        $pdf = \PDF::loadView('InventoryAdjustment.report', compact('inventoryadjustments'));
        return $pdf->download('inventoryadjustment-report.pdf');
    }

    public function getLowStockAlerts()
    {
        $lowStockProducts = \App\Models\Product::whereColumn('quantity', '<=', 'reorder_level')->get();
        return response()->json($lowStockProducts);
    }

    public function getInventorySummary()
    {
        $totalProducts = \App\Models\Product::count();
        $totalValue = \App\Models\Product::sum(\DB::raw('price * quantity'));
        $lowStockProducts = \App\Models\Product::whereColumn('quantity', '<=', 'reorder_level')->count();

        return response()->json([
            'total_products' => $totalProducts,
            'total_value' => $totalValue,
            'low_stock_products' => $lowStockProducts,
        ]);
    }

    public function getRecentActivity()
    {
        $recentActivities = \App\Models\InventoryAdjustment::latest()->take(10)->get();
        return response()->json($recentActivities);
    }

    public function getInventoryTransactions()
    {
        $transactions = \App\Models\InventoryAdjustment::with('product')->get();
        return response()->json($transactions);
    }

    public function getInventoryTrendData()
    {
        $monthlyData = \App\Models\InventoryAdjustment::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->get();
        return response()->json($monthlyData);
    }

    public function getInventoryAdjustmentChartData()
    {
        $data = \App\Models\InventoryAdjustment::selectRaw('product_id, COUNT(*) as count')
            ->groupBy('product_id')
            ->get();
        return response()->json($data);
    }

    public function getInventoryAdjustmentByProduct($productId)
    {
        $inventoryadjustments = \App\Models\InventoryAdjustment::where('product_id', $productId)->get();
        return response()->json($inventoryadjustments);
    }
   
}
