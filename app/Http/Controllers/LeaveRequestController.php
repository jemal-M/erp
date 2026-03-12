<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveRequestController extends Controller
{
    public function index()
    {
        return Inertia::render('LeaveRequests/Index');
    }

    public function create()
    {
        return Inertia::render('LeaveRequests/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'leave_type' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string|max:500',
        ]);

        // Save to database (implement your logic here)

        return redirect()->route('leave-requests.index')->with('success', 'Leave request submitted successfully.');
    }

    public function show($id)
    {
        $leaveRequest = []; // This should come from your database
        // Fetch and display a specific leave request
        return Inertia::render('LeaveRequests/Show', [
            'leaveRequest' => $leaveRequest, // Fetch from database
        ]);
    }

    public function edit($id)
    {
        $leaveRequest = []; // This should come from your database
        // Fetch and return data for editing
        return Inertia::render('LeaveRequests/Edit', [
            'leaveRequest' => $leaveRequest, // Fetch from database
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'leave_type' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string|max:500',
            'status' => 'required|in:pending,approved,rejected',
        ]);

        // Update the leave request in the database
        // Implement your update logic here

        return redirect()->route('leave-requests.index')->with('success', 'Leave request updated successfully.');
    }

    public function destroy($id)
    {
        // Delete the leave request from the database
        // Implement your delete logic here
         LeaveRequest::destroy($id);
        return redirect()->route('leave-requests.index')->with('success', 'Leave request deleted successfully.');
    }

    public function approve($id)
    {
        $leaveRequest = LeaveRequest::find($id);
        $leaveRequest->status = 'approved';
        $leaveRequest->save();

        return redirect()->back()->with('success', 'Leave request approved.');
    }

    public function reject($id)
    {
        $leaveRequest = LeaveRequest::find($id);
        $leaveRequest->status = 'rejected';
        $leaveRequest->save();

        return redirect()->back()->with('success', 'Leave request rejected.');
    }
    
}
