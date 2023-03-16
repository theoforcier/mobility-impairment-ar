<?php
   
namespace App\Http\Controllers\API;
   
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\UserDistance\ShowRequest;
use App\Http\Requests\UserDistance\AddRequest;

use App\Models\UserDistance;



class UserDistanceController extends BaseController
{

    protected UserDistance $model;

    public function __construct(UserDistance $model)
    {
        $this->model = $model;
    }

    
    public function show(ShowRequest $request): object
    {
        $record = $this->model->dateDistance($request->validated()['date']);
        return $this->sendResponse($record);
    }

    public function add(AddRequest $request): object
    {
        $date = $request->validated()['date'];
        $meters = $request->validated()['meters'];

        if ($this->model->addDistance($date, $meters)) {
            $record = $this->model->dateDistance($date);
            return $this->sendResponse($record);
        }
        
        return $this->sendError("Unable to process request.");
    }


}