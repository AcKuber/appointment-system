<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OfficerController extends Controller
{
    public function index() {
        return view('officer.index');
    }

    public function store(Request $request) {
        $this->validate($request, [
            'name' => 'required|alpha',
            'post' => 'required|alpha',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i'
        ]);

        echo "validated";
        die;
    }
}
