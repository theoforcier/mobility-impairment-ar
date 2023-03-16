<?php
   
namespace App\Http\Controllers\API;
   
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\Group\StoreRequest;

use App\Models\Group;



class GroupController extends BaseController
{

    protected Group $model;

    public function __construct(Group $model)
    {
        $this->model = $model;
    }

    
    public function show(): object
    {
        $group = auth()->user()->activeGroups()->first();
        return $this->sendResponse($group);
    }

    public function store(StoreRequest $request): object
    {
        $group = auth()->user()->groups()->create();
        return $this->sendResponse($group);
    }

    public function invite()
    {
        
    }


}