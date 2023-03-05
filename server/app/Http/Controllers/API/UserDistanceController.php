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
        $record = $this->model->onDate($request->validated()['date']);
        return $this->sendResponse($record);
    }

    public function add(AddRequest $request): object
    {
        if ($this->model->addDistance($request->validated()['meters']));
            return $this->sendResponse($this->model->today());
        return $this->sendError("Unable to process request.");
    }


}