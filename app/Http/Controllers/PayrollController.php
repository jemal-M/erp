<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollController extends Controller
{
    public function index()
    {
        return Inertia::render('Payroll/Index');
    }

    public function show($id)
    {
        return Inertia::render('Payroll/Show', [
            'id' => $id
        ]);
    }
    public function create()
    {
        return Inertia::render('Payroll/Create');
    }

    public function edit($id)
    {
        return Inertia::render('Payroll/Edit', [
            'id' => $id
        ]);
    }

    public function payslip($id)
    {
        return Inertia::render('Payroll/Payslip', [
            'id' => $id
        ]);
    }

    public function report()
    {
        return Inertia::render('Payroll/Report');
    }

    public function ledger()
    {
        return Inertia::render('Payroll/Ledger');
    }

    public function payment()
    {
        return Inertia::render('Payroll/Payment');
    }

    public function salary()
    {
        return Inertia::render('Payroll/Salary');
    }

    public function allowance()
    {
        return Inertia::render('Payroll/Allowance');
    }

    public function deduction()
    {
        return Inertia::render('Payroll/Deduction');
    }

    public function employee()
    {
        return Inertia::render('Payroll/Employee');
    }
    
}
