<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        return Inertia::render('Transactions/Index');
    }

    public function create()
    {
        return Inertia::render('Transactions/Create');
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'type' => 'required|in:credit,debit',
            'category' => 'required'
        ]);

        $transaction = auth()->user()->transactions()->create($validate);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $transaction = auth()->user()->transactions()->findOrFail($id);
        $transaction->delete();

        return redirect()->back();
    }
    public function edit($id)
    {
        $transaction = auth()->user()->transactions()->findOrFail($id);
        
        return Inertia::render('Transactions/Edit', [
            'transaction' => $transaction
        ]);
    }
    public function update(Request $request, $id)
    {
        $transaction = auth()->user()->transactions()->findOrFail($id);

        $validate = $request->validate([
            'name' => 'required',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'type' => 'required|in:credit,debit',
            'category' => 'required'
        ]);

        $transaction->update($validate);

        return redirect()->route('transactions.index');
    }
    public function show($id)
    {
        $transaction = auth()->user()->transactions()->findOrFail($id);

        return Inertia::render('Transactions/Show', [
            'transaction' => $transaction
        ]);
    }
    public function summary()
    {
        $transactions = auth()->user()->transactions()->get();
        $summary = [
            'income' => $transactions->where('type', 'credit')->sum('amount'),
            'expense' => $transactions->where('type', 'debit')->sum('amount'),
            'balance' => $transactions->where('type', 'credit')->sum('amount') - $transactions->where('type', 'debit')->sum('amount')
        ];

        return Inertia::render('Transactions/Summary', [
            'summary' => $summary
        ]);
    }
    public function report()
    {
        $transactions = auth()->user()->transactions()->get();
        $summary = [
            'income' => $transactions->where('type', 'credit')->sum('amount'),
            'expense' => $transactions->where('type', 'debit')->sum('amount'),
            'balance' => $transactions->where('type', 'credit')->sum('amount') - $transactions->where('type', 'debit')->sum('amount')
        ];

        return Inertia::render('Transactions/Report', [
            'summary' => $summary,
            'transactions' => $transactions
        ]);
    }
    public function category()
    {
        $categories = auth()->user()->categories()->get();

        return Inertia::render('Transactions/Category', [
            'categories' => $categories
        ]);
    }
    public function addCategory(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required'
        ]);

        auth()->user()->categories()->create($validate);

        return redirect()->back();
    }
}
