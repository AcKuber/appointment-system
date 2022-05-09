<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Models\Officer;

class OfficerController extends Controller
{
    public function index() {
        $data = Officer::get();
        return view('officer.index', [
            'data' => $data
        ]);
    }

    public function store(Request $request) {
        /*$this->validate($request, [
            'name' => 'required|alpha',
            'post' => 'required|alpha',
            'status' => 'required',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|gt:start_time'
        ]);*/

        $validator = \Validator::make($request->all(), [
            'name' => ['required', 'regex:/^[a-zA-Z\s]*$/'],
            'post' => 'required|alpha',
            'status' => 'required',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i'
        ]);

        $clientErrors = array();

        if($validator->fails()) {
            $errors = $validator->errors()->getMessages();  
            foreach ($errors as $key => $value) {
                $clientErrors[$key] = $value[0];
            }

            $response = array(
                'status' => 'error',
                'errors' => $clientErrors
            );

            return response()->json($response);
        }

        if(strtotime($request->start_time) >= strtotime($request->end_time)) {
               //if(! Arr::exists($clientErrors, 'start_time')) 
                $clientErrors['start_time'] = 'Start time must be smaller than end time';

                $response = array(
                    'status' => 'error',
                    'errors' => $clientErrors
                );
                return response()->json($response);
        }

        // now insert into database+
        Officer::create([
           'oname' => $request->name,
           'post' => $request->post,
           'ostatus' => $request->status,
           'workStartTime' => $request->start_time,
           'workEndTime' => $request->end_time 
        ]);

        return response()->json(['success' => 'Data inserted successfully.']);
    }
}
