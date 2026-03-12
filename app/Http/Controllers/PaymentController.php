<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
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
        return \App\Models\Payment::prepare($paypal_data)->execute();
    }
}
