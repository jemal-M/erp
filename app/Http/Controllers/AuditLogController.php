<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuditLogController extends Controller
{
    public function index()
    {
        return Inertia::render("AuditLog/Index");
    }
    public function create()
    {
        return Inertia::render("AuditLog/Create");
    }
    public function store(Request $request)
    {
        $request->validate([
                         'description' => 'required|string|max:255'
        ]);
              
        return redirect()->back();
    }
    public function show($id)
    {
        return Inertia::render("AuditLog/Show", ['id' => $id]);
    }
    public function edit($id)
    {
        return Inertia::render("AuditLog/Edit", ['id' => $id]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
                         'description' => 'required|string|max:255'
        ]);

        return redirect()->back();
    }
    public function destroy($id)
    {
       AuditLog::destroy($id);
        return redirect()->back();
    }
}
