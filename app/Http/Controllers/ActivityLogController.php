<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function index()
    {
        $activityLogs = ActivityLog::all();
        return Inertia::render('ActivityLog/Index', [
            'activityLogs' => $activityLogs
        ]);
    }

    public function create()
    {
        return Inertia::render('ActivityLog/Create');
    }

    public function store(Request $request)
    {
        ActivityLog::create($request->all());
        return redirect()->back();
    }

    public function destroy(ActivityLog $activityLog)
    {
        $activityLog->delete();
        return redirect()->back();
    }
    public function edit(ActivityLog $activityLog)
    {
        return Inertia::render('ActivityLog/Edit', [
            'activityLog' => $activityLog
        ]);
    }
    public function update(Request $request, ActivityLog $activityLog)
    {
        $activityLog->update($request->all());
        return redirect('/activitylog');
    }
    public function show(ActivityLog $activityLog)
    {
        return Inertia::render('ActivityLog/Show', [
            'activityLog' => $activityLog
        ]);
    }
   
    public function search(Request $request){
        $search = $request->get('search');
        $activityLogs = ActivityLog::where('description', 'like', "%$search%")->get();
        return Inertia::render('ActivityLog/Index', [
            'activityLogs' => $activityLogs
        ]);
    }

    public function filter(Request $request){
        $filter = $request->get('filter');
        $activityLogs = ActivityLog::where('user_id', '=', "$filter")->get();
        return Inertia::render('ActivityLog/Index', [
            'activityLogs' => $activityLogs
        ]);
    }
  
}
