<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Officer;
use App\Models\Visitor;
use App\Models\Activity;
use App\Models\WorkDays;

class ActivityController extends Controller
{
    public function index() {
        $officer = Officer::select('id', 'oname')
                        ->where("ostatus", "=", "Active")
                        ->get();

        $visitor = Visitor::select('id', 'vname')
                        ->where("vstatus", "=", "Active")
                        ->get();

        return view('activity.index', [
            'officer' => $officer,
            'visitor' => $visitor
        ]);
    }

    public function store(Request $request) {

        if($request->activity_type === "Appointment") {
            $validator = \Validator::make($request->all(), [
                'activity_name' => ['required', 'regex:/^[a-zA-Z\s]*$/'],
                'officer_name' => 'required',
                'visitor_name' => 'required',
                'activity_date' => 'required',
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
        } else {
            $validator = \Validator::make($request->all(), [
                'activity_name' => ['required', 'regex:/^[a-zA-Z\s]*$/'],
                'officer_name' => 'required',
                'activity_date' => 'required',
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

        $currentDate = date("Y-m-d", time());

        if($request->activity_date < $currentDate) {
            $clientErrors['activity_date'] = 'Please enter valid activity date.';
                

                $response = array(
                    'status' => 'error',
                    'errors' => $clientErrors
                );
                return response()->json($response);
        }

        $activities = Activity::get()->all();
        $activity = new Activity();

        if(count($activities) > 0) {
            $officerWorkDays = WorkDays::select('DAYOFWEEK')
                                ->where("officer_id", "=", $request->officer_name)
                                ->get()
                                ->all();
            // note $request->officer_name contains officer id rather than name
            // just used for quick automatic validation

            $requestedDay = strtolower(date("l", strtotime($request->activity_date)));

            $isWorkDay = false;

            foreach($officerWorkDays as $column => $value) {
                if($requestedDay == $value->DAYOFWEEK) {
                    $isWorkDay = true;
                    break;
                }
            }

            if(! $isWorkDay) {
                $clientErrors['activity_date'] = 'Officer is not available in this date.';
                

                $response = array(
                    'status' => 'error',
                    'errors' => $clientErrors
                );
                return response()->json($response);    
            }

            // now check for office time
            $officeTime = Officer::select('workStartTime', 'workEndTime')
                                    ->where("id", "=", $request->officer_name)
                                    ->get()
                                    ->all();

            foreach($officeTime as $column => $value) {
                $officerWorkStartTime = $value->workStartTime ;
                $officerWorkEndTime = $value->workEndTime;
            }

            if(!($request->start_time >= $officerWorkStartTime && $request->end_time <= $officerWorkEndTime)) {
                $clientErrors['start_time'] = 'Officer is not available in this time.';
                

                $response = array(
                    'status' => 'error',
                    'errors' => $clientErrors
                );
                return response()->json($response);   
            }

            foreach($activities as $column => $value) {
                $officerid = $value->officer_id;
                $visitorid = $value->visitor_id;
                $type = $value->atype;
                $status = $value->astatus;
                $date = $value->adate;
                $starttime = $value->startTime;
                $endtime = $value->endTime;

                if($request->activity_date == $date) {
                    if($request->officer_name == $officer_id || $request->visitor_name == $visitorid) {
                        if($status != "Cancelled") {
                            if(((strtotime($request->start_time) < strtotime($starttime) && strtotime($request->end_time) < strtotime($starttime)) || (strtotime($request->start_time) > strtotime($endtime) && strtotime($request->end_time) > strtotime($endtime))) && (strtotime($request->start_time) < strtotime($request->end_time)))  {

                                $activity->officer_id = $request->officer_name;
                                $activity->visitor_id = $request->visitor_name;
                                $activity->aname = $request->activity_name;
                                $activity->atype = $request->activity_type;
                                $activity->astatus = $request->status;
                                $activity->adate = $request->activity_date;
                                $activity->startTime = $request->start_time;
                                $activity->endTime = $request->end_time;

                                $activity->save();

                                return response()->json(['success' => 'Activity inserted successfully.']);
                            } else {
                                $clientErrors['officer_name'] = 'Officer or visitor alerady has appointment.';
                

                                $response = array(
                                    'status' => 'error',
                                    'errors' => $clientErrors
                                );
                                return response()->json($response); 
                            }
                        } else {
                            $activity->officer_id = $request->officer_name;
                            $activity->visitor_id = $request->visitor_name;
                            $activity->aname = $request->activity_name;
                            $activity->atype = $request->activity_type;
                            $activity->astatus = $request->status;
                            $activity->adate = $request->activity_date;
                            $activity->startTime = $request->start_time;
                            $activity->endTime = $request->end_time;

                            $activity->save();

                            return response()->json(['success' => 'Activity inserted successfully.']);
                        }
                    } else {
                        $activity->officer_id = $request->officer_name;
                        $activity->visitor_id = $request->visitor_name;
                        $activity->aname = $request->activity_name;
                        $activity->atype = $request->activity_type;
                        $activity->astatus = $request->status;
                        $activity->adate = $request->activity_date;
                        $activity->startTime = $request->start_time;
                        $activity->endTime = $request->end_time;

                        $activity->save();

                        return response()->json(['success' => 'Activity inserted successfully.']);
                    }
                 } else {
                    $activity->officer_id = $request->officer_name;
                    $activity->visitor_id = $request->visitor_name;
                    $activity->aname = $request->activity_name;
                    $activity->atype = $request->activity_type;
                    $activity->astatus = $request->status;
                    $activity->adate = $request->activity_date;
                    $activity->startTime = $request->start_time;
                    $activity->endTime = $request->end_time;

                    $activity->save();

                    return response()->json(['success' => 'Activity inserted successfully.']);
                 }

            }


        }

        $activity->officer_id = $request->officer_name;
        $activity->visitor_id = $request->visitor_name;
        $activity->aname = $request->activity_name;
        $activity->atype = $request->activity_type;
        $activity->astatus = $request->status;
        $activity->adate = $request->activity_date;
        $activity->startTime = $request->start_time;
        $activity->endTime = $request->end_time;

        $activity->save();

        return response()->json(['success' => 'Activity inserted successfully.']);        
    }

    public function fetchActivity(Request $request) {

        $activity = Activity::select('aname', 'atype', 'astatus', 'adate', 'startTime', 'endTime', 'oname', 'vname')
            ->leftjoin('officer','activity.officer_id','=','officer.id')
            ->leftjoin('visitor','activity.visitor_id','=','visitor.id')
            ->orderBy('adate', 'DESC')
            ->get()->all();

         
        return response()->json([
            'activity' => $activity
        ]);
    }
}

