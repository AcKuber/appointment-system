<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visitor;

class VisitorController extends Controller
{
    public function index() {
        $data = Visitor::get();
        return view('visitor.index', [
            'data' => $data
        ]);
    }

    public function store(Request $request) {
        $validator = \Validator::make($request->all(), [
            'name' => ['required', 'regex:/^[a-zA-Z\s]*$/'],
            'mobile' => 'required|digits:10',
            'email' => 'required|email|unique:visitor',
            'status' => 'required'
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

        // now insert into database+
        $visitor = Visitor::create([
           'vname' => $request->name,
           'mobile_no' => $request->mobile,
           'email' => $request->email,
           'vstatus' => $request->status 
        ]);

        return response()->json(['success' => 'Data inserted successfully.']);
    }

    public function toggleStatus(Request $request) {

        if($request->status == "Active" || $request->status == "Inactive") {
            $obj = Visitor::findOrFail($request->id);

            $obj->vstatus = ($request->status == "Active") ? "Inactive": "Active";
            $obj->save();
            return response()->json(['success' => 'Toggled successfully']);   
        }
        return null;     
    }
}
