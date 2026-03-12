<?php

namespace App\Http\Controllers;

use App\Models\StockMovement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockMovementController extends Controller
{
  public function index()
  {
    return Inertia::render('StockMovements/Index');
  }

  public function create()
  {
    return Inertia::render('StockMovements/Create');
  }

  public function show($id)
  {
    return Inertia::render('StockMovements/Show', [
      'id' => $id
    ]);
  }

  public function edit($id)
  {
    return Inertia::render('StockMovements/Edit', [
      'id' => $id
    ]);
  }

  public function transfer()
  {
    return Inertia::render('StockMovements/Transfer');
  }

  public function stocktake()
  {
    return Inertia::render('StockMovements/Stocktake');
  }

  public function adjustment()
  {
    return Inertia::render('StockMovements/Adjustment');
  }

  public function destroy($id)
  {
    // delete item with id
    StockMovement::find($id);
     $stockMovement = StockMovement::find($id);
     $stockMovement->delete();
    return redirect('/stockmovements');
  }

  public function update(Request $request, $id)
  {
    // update item with id
    $stockMovement = StockMovement::find($id);
    $stockMovement->fill($request->input('stockMovement'));
    $stockMovement->update($request->all());
    return redirect('/stockmovements');
  }

  public function store(Request $request)
  {
    $request->validate([
      'stockMovement.*' => 'required|array|min:1',
      'stockMovement.*.quantity' => 'required|integer|min:1',
      'stockMovement.*.product_id' => 'required|integer|min:1',
      'stockMovement.*.location_id' => 'required|integer|min:1',
    ]);
    // save new item
    StockMovement::create($request->all());
    return redirect('/stockmovements');
  }

  public function search(Request $request)
  {
    $search = $request->get('q');
    $stockMovements = StockMovement::where('id', 'like', "%$search%")->get();
    return $stockMovements;
  }

  public function getMovements(){
    $stockMovements = StockMovement::all();
    return $stockMovements;
  }

  public function getMovement($id){
    $stockMovement = StockMovement::find($id);
    return $stockMovement;
  }

  public function getMovementByProduct($productId){
    $stockMovement = StockMovement::where('product_id', $productId)->get();
    return $stockMovement;
  }

  public function getMovementByLocation($locationId){
    $stockMovement = StockMovement::where('location_id', $locationId)->get();
    return $stockMovement;
  }

  public function getMovementByDate($date){
    $stockMovement = StockMovement::where('created_at', $date)->get();
    return $stockMovement;
  }

  public function getMovementByType($type){
    $stockMovement = StockMovement::where('type', $type)->get();
    return $stockMovement;
  }

  public function getMovementByProductAndLocation($productId, $locationId){
    $stockMovement = StockMovement::where('product_id', $productId)->where('location_id', $locationId)->get();
    return $stockMovement;
  }

    public function getMovementByProductAndDate($productId, $date){
      $stockMovement = StockMovement::where('product_id', $productId)->where('created_at', $date)->get();
      return $stockMovement;
      }
      
}
