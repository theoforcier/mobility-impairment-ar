<?php
   
namespace App\Http\Controllers\API;
   
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\User\IndexRequest;
use App\Http\Requests\User\UpdateRequest;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;

use App\Models\User;



class UserController extends BaseController
{

    protected User $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    
    public function show(): object
    {
        $user = auth()->user()->toArray();
        $user['meters_travelled'] = auth()->user()->totalMetersTravelled();
        return $this->sendResponse($user);
    }

    
    public function index(IndexRequest $request)
    {
        $data = new UserCollection($this->model->searchUsers($request['display_name']));
        return $this->sendResponse($data);
    }
    

    public function update(UpdateRequest $request)
    {
        auth()->user()->update($request->input());
        return $this->show();
    }

}