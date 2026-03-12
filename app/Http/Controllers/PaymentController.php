<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        return Inertia::render('Payments/Index');
    }

    public function create()
    {
        return Inertia::render('Payments/Create');
    }

    public function store(Request $request)
    {
        return redirect()->back();
    }

    public function show($id)
    {
        return Inertia::render('Payments/Show', [
            'payment' => $id
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Payments/Edit', [
            'payment' => $id
        ]);
    }

    public function update(Request $request, $id)
    {
        return redirect()->back();
    }

    public function destroy($id)
    {
        return redirect()->back();
    }

    public function paywithpaypal(Request $request)
    {
       $request->validate([
            'amount' => 'required'
        ]);
        $paypal_data = array();
        $paypal_data['items'] = [
            [
                'name' => 'Product Name',
                'price' => $request->amount,
                'qty' => 1
            ]
        ];
        $paypal_data['invoice_id'] = time();
        $paypal_data['invoice_description'] = "Order Description";
        $paypal_data['return_url'] = url('/success-payment');
        $paypal_data['cancel_url'] = url('/cancel-payment');
        $paypal_data['total'] = $request->amount;
        return Payment::prepare($paypal_data)->execute();
    }
}
