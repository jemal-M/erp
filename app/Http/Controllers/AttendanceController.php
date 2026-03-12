<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index()
    {
        return Inertia::render("Attendance/Index");
    }

    public function create()
    {
        return Inertia::render("Attendance/Create");
    }

    public function store(Request $request)
    {
        $payload = $request->validate([
            'date' => 'required|date',
            'check_in' => 'required|date_format:H:i',
            'check_out' => 'required|date_format:H:i',
        ]);

        $attendance = auth()->user()->attendances()->create($payload);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $attendance = auth()->user()->attendances()->findOrFail($id);
        $attendance->delete();

        return redirect()->back();
    }
   public function edit($id)
    {
        $attendance = auth()->user()->attendances()->findOrFail($id);

        return Inertia::render("Attendance/Edit", [
            'attendance' => $attendance
        ]);
    }
    public function update(Request $request, $id)
    {
        $payload = $request->validate([
            'date' => 'required|date',
            'check_in' => 'required|date_format:H:i',
            'check_out' => 'required|date_format:H:i',
        ]);

        $attendance = auth()->user()->attendances()->findOrFail($id);
        $attendance->update($payload);

        return redirect()->route('attendance.index');
    }
    public function show($id)
    {
        $attendance = auth()->user()->attendances()->findOrFail($id);

        return Inertia::render("Attendance/Show", [
            'attendance' => $attendance
        ]);
    }
    public function report()
    {
        return Inertia::render("Attendance/Report");
    }
   
    public function export()
    {
        $attendances = auth()->user()->attendances()->get();
        return response()->streamDownload(function () use ($attendances) {
            $handle = fopen('php://output', 'rb');

            fputcsv($handle, ['Date', 'Check In', 'Check Out']);

            foreach ($attendances as $attendance) {
                fputcsv($handle, [
                    $attendance->date,
                    $attendance->check_in,
                    $attendance->check_out,
                ]);
            }

            fclose($handle);
        }, 'attendance.csv');
    }
    public function calendar()
    {
        return Inertia::render("Attendance/Calendar");
    }
    public function chart()
    {
        return Inertia::render("Attendance/Chart");
    }
    public function table()
    {
        return Inertia::render("Attendance/Table");
    }
    public function api()
    {
        $attendances = auth()->user()->attendances()->get(['date', 'check_in', 'check_out']);
        return response()->json($attendances);
    }
    public function apiChart()
    {
        $attendances = auth()->user()->attendances()
            ->selectRaw('DATE(date) as date')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('date')
            ->get();
        return response()->json($attendances);
    }
    public function apiTable()
    {
        $attendances = auth()->user()->attendances()
            ->selectRaw('DATE(date) as date')
            ->selectRaw('TIME(check_in) as check_in')
            ->selectRaw('TIME(check_out) as check_out')
            ->get();
        return response()->json($attendances);
    }
}
