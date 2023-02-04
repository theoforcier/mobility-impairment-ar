<?php
   
namespace App\Http\Controllers\API;
   
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\User\UpdateRequest;
use App\Models\User;


class UserController extends BaseController
{
    
    public function show(): object
    {
        return $this->sendResponse(auth()->user()->toArray());
    }
    

    public function update(UpdateRequest $request)
    {
        auth()->user()->update($request->input());
        return $this->show();
    }
}