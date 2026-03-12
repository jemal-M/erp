<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index()
    {
        return Inertia::render('Expenses/Index');
    }

    public function create()
    {
        return Inertia::render('Expenses/Create');
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required',
            'amount' => 'required|numeric|min:0'
        ]);

        $expense = auth()->user()->expenses()->create($validate);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $expense = auth()->user()->expenses()->findOrFail($id);
        $expense->delete();

        return redirect()->back();
    }
    public function  edit($id)
    {
        $expense = auth()->user()->expenses()->findOrFail($id);
        
        return Inertia::render('Expenses/Edit', [
            'expense' => $expense
        ]);
    }
    public function update(Request $request, $id)
    {
        $validate = $request->validate([
            'title' => 'required',
            'amount' => 'required|numeric|min:0'
        ]);

        $expense = auth()->user()->expenses()->findOrFail($id);
        $expense->update($validate);

        return redirect()->route('expenses.index');
    }
    public function show($id)
    {
        $expense = auth()->user()->expenses()->findOrFail($id);

        return Inertia::render('Expenses/Show', [
            'expense' => $expense
        ]);
    }
    public function total()
    {
        $total = auth()->user()->expenses()->sum('amount');

        return $total;
    }
}
