<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseOrderItemController extends Controller
{
    public function index()
    {
        return Inertia::render("PurchaseOrderItem/Index");
    }

    public function create()
    {
        return Inertia::render("PurchaseOrderItem/Create");
    }

    public function edit($id)
    {
        $purchaseOrderItem = PurchaseOrderItem::find($id);
        return Inertia::render("PurchaseOrderItem/Edit", [
            'id' => $id,
            'purchaseorderitem'=>$purchaseOrderItem
        ]);
    }
   
    public function show($id)
    {
        $purchaseOrderItem = PurchaseOrderItem::find($id);
        return Inertia::render("PurchaseOrderItem/Show", [
            'id' => $id,
            'purchaseorderitem'=>$purchaseOrderItem
        ]);
    }

    public function destroy($id)
    {
        PurchaseOrderItem::find($id)->delete();
        return redirect('/purchaseorderitem');
    }
    public function update(Request $request, $id)
    {
        $purchaseOrderItem = PurchaseOrderItem::find($id);
        $purchaseOrderItem->update($request->all());
        return redirect('/purchaseorderitem');
    }

    public function store(Request $request)
    {
        PurchaseOrderItem::create($request->all());
        return redirect('/purchaseorderitem');
    }

    public function search(Request $request){
        $search = $request->get('search');
        $purchaseOrderItems = PurchaseOrderItem::where('name', 'like', '%'.$search.'%')->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function get(){
        $purchaseOrderItems = PurchaseOrderItem::all();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbyid(Request $request){
        $purchaseOrderItem = PurchaseOrderItem::where('id',$request->id)->get();
        return response()->json([
            'purchaseOrderItem' => $purchaseOrderItem
        ]);
    }

    public function getbypurchaseorder(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('purchase_order_id', $request->purchase_order_id)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbysupplier(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('supplier_id', $request->supplier_id)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbyitem(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('item_id', $request->item_id)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbypurchaseorderanditem(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('purchase_order_id', $request->purchase_order_id)->where('item_id', $request->item_id)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbypurchaseorderanditemandstatus(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('purchase_order_id', $request->purchase_order_id)->where('item_id', $request->item_id)->where('status', $request->status)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbypurchaseorderandstatus(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('purchase_order_id', $request->purchase_order_id)->where('status', $request->status)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbystatus(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('status', $request->status)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbydate(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('created_at', '>=', $request->start_date)->where('created_at', '<=', $request->end_date)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbydateandstatus(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('created_at', '>=', $request->start_date)->where('created_at', '<=', $request->end_date)->where('status', $request->status)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbydateandpurchaseorder(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('created_at', '>=', $request->start_date)->where('created_at', '<=', $request->end_date)->where('purchase_order_id', $request->purchase_order_id)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbydateandpurchaseorderandstatus(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('created_at', '>=', $request->start_date)->where('created_at', '<=', $request->end_date)->where('purchase_order_id', $request->purchase_order_id)->where('status', $request->status)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbydateanditem(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('created_at', '>=', $request->start_date)->where('created_at', '<=', $request->end_date)->where('item_id', $request->item_id)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbydateanditemandstatus(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('created_at', '>=', $request->start_date)->where('created_at', '<=', $request->end_date)->where('item_id', $request->item_id)->where('status', $request->status)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbydateandpurchaseorderanditem(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('created_at', '>=', $request->start_date)->where('created_at', '<=', $request->end_date)->where('purchase_order_id', $request->purchase_order_id)->where('item_id', $request->item_id)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbydateandpurchaseorderanditemandstatus(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('created_at', '>=', $request->start_date)->where('created_at', '<=', $request->end_date)->where('purchase_order_id', $request->purchase_order_id)->where('item_id', $request->item_id)->where('status', $request->status)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbydateandsupplier(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('created_at', '>=', $request->start_date)->where('created_at', '<=', $request->end_date)->where('supplier_id', $request->supplier_id)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbydateandsupplierandstatus(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('created_at', '>=', $request->start_date)->where('created_at', '<=', $request->end_date)->where('supplier_id', $request->supplier_id)->where('status', $request->status)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbydateandsupplierandpurchaseorder(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('created_at', '>=', $request->start_date)->where('created_at', '<=', $request->end_date)->where('supplier_id', $request->supplier_id)->where('purchase_order_id', $request->purchase_order_id)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbydateandsupplierandpurchaseorderandstatus(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('created_at', '>=', $request->start_date)->where('created_at', '<=', $request->end_date)->where('supplier_id', $request->supplier_id)->where('purchase_order_id', $request->purchase_order_id)->where('status', $request->status)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }

    public function getbydateandsupplierandpurchaseorderanditem(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('created_at', '>=', $request->start_date)->where('created_at', '<=', $request->end_date)->where('supplier_id', $request->supplier_id)->where('purchase_order_id', $request->purchase_order_id)->where('item_id', $request->item_id)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }
    public function getbydateandsupplierandpurchaseorderanditemandstatus(Request $request){
        $purchaseOrderItems = PurchaseOrderItem::where('created_at', '>=', $request->start_date)->where('created_at', '<=', $request->end_date)->where('supplier_id', $request->supplier_id)->where('purchase_order_id', $request->purchase_order_id)->where('item_id', $request->item_id)->where('status', $request->status)->get();
        return response()->json([
            'purchaseOrderItems' => $purchaseOrderItems
        ]);
    }
    

}
