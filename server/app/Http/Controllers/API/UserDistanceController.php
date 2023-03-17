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
        $record = $record ?? ['date' => $request->validated()['date'], 'meters' => 0];
        return $this->sendResponse($record);
    }

    public function add(AddRequest $request): object
    {
        if ($this->model->addDistance($request->validated()['meters'])) {
            $date = now()->toDateString();
            $record = $this->model->dateDistance($date);
            return $this->sendResponse($record);
        }

        return $this->sendError("Unable to process request.");
    }


}