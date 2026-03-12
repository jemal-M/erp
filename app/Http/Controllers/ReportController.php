<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render("Report/Index");
    }

    public function show($id)
    {
        // fetch report data
        $report =Report::find($id);
        return Inertia::render("Report/Show", [
            'reportId' => $id,
            'report'=>$report
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'location' => 'required|string|max:255',
        ]);

        $report = Report::create($request->all());
        return redirect()->route('report.show', ['id' => $report->id]);
        
    }

    public function edit($id)
    {
        $report = Report::find($id);
        return Inertia::render("Report/Edit", [
            'report' => $report
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'date' => 'date',
            'location' => 'string|max:255',
        ]);

        $report = Report::find($id);
        $report->update($request->all());
        return redirect()->route('report.show', ['id' => $report->id]);
    }

    public function destroy($id)
    {
        $report = Report::find($id);
        $report->delete();
        return redirect('/report');
    }

    public function create()
    {
        return Inertia::render("Report/Create");
    }
  
}
