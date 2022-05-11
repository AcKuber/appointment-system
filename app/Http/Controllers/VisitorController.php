<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visitor;
use App\Models\Activity;

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

        if($request->status == "Active") {
            $obj = Visitor::findOrFail($request->id);

            $obj->vstatus = ($request->status == "Active") ? "Inactive": "Active";
            $obj->save();

            Activity::where('visitor_id', '=', $request->id)->update([
                'astatus' => 'Deactivated'
            ]);

            return response()->json(['success' => 'Toggled successfully']);   
        } else if($request->status == "Inactive") {
            $obj = Visitor::findOrFail($request->id);

            $obj->vstatus = ($request->status == "Active") ? "Inactive": "Active";
            $obj->save();

            Activity::where('visitor_id', '=', $request->id)->update([
                'astatus' => 'Active'
            ]);
            return response()->json(['success' => 'Toggled successfully']);
        }
        return null;     
    }

    public function edit(Request $request) {
        $validator = \Validator::make($request->all(), [
            'name' => ['required', 'regex:/^[a-zA-Z\s]*$/'],
            'mobile' => 'required|digits:10',
            'email' => 'required|email'
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

        $visitor = Visitor::findOrFail($request->id);
        $visitor->vname = $request->name;
        $visitor->mobile_no = $request->mobile;
        $visitor->email = $request->email;

        $visitor->save();
        return response()->json(['success' => 'Data updated successfully.']);

    }

    public function getDetail(Request $request) {
        $visitor = Visitor::select('id', 'vname as name', 'mobile_no as mobile', 'email')->findOrFail($request->id);

        return response()->json($visitor);
    }
}
