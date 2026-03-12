<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseCategoryController extends Controller
{
  public function index()
  {
    return Inertia::render('ExpenseCategories/Index');
}
  public function create()
  {
    return Inertia::render('ExpenseCategories/Create');
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => 'required|max:255',
    ]);
    ExpenseCategory::create($validated);
    return redirect()->back();
  }

  public function destroy(ExpenseCategory $expenseCategory)
  {
    $expenseCategory->delete();
    return redirect()->back();
  }

  public function edit(ExpenseCategory $expenseCategory)
  {
    return Inertia::render('ExpenseCategories/Edit', [
      'expenseCategory' => $expenseCategory
    ]);
  }

  public function update(Request $request, ExpenseCategory $expenseCategory)
  {
    $validated = $request->validate([
      'name' => 'required|max:255',
    ]);
    $expenseCategory->update($validated);
    return redirect('/expense-categories');
  }

  public function show(ExpenseCategory $expenseCategory)
  {
    return Inertia::render('ExpenseCategories/Show', [
      'expenseCategory' => $expenseCategory->load('expenses')
    ]);
  }
  
}