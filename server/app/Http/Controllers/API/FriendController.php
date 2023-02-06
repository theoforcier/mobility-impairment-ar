<?php
   
namespace App\Http\Controllers\API;
   
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\Friend\StoreRequest;
use App\Http\Requests\Friend\DestroyRequest;
use App\Http\Requests\Friend\UpdateRequest;
use App\Http\Requests\Friend\IndexRequest;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;

use Illuminate\Http\Request;
use App\Models\Friend;



class FriendController extends BaseController
{

    protected Friend $model;

    public function __construct(Friend $model)
    {
        $this->model = $model;
    }


    public function store(StoreRequest $request)
    {
        $data = auth()->user()->friendsTo()->attach($request['friend_id']);
        return $this->sendResponse($data);
    }

    public function destroy(DestroyRequest $request)
    {
        $success = $this->model->unfriend($request['friend_id']);
        if ($success)
            return $this->sendResponse(null);
        return $this->sendError("Unable to find/delete record.");
    }

    public function accept(UpdateRequest $request)
    {
        auth()->user()->friendsFrom()->updateExistingPivot($request['friend_id'], ['accepted' => true]);
        return $this->sendResponse(null);
    }

    public function friends(IndexRequest $request)
    {
        $data = new UserCollection(auth()->user()->friends);
        return $data;
    }

    public function pending(IndexRequest $request)
    {
        $data = new UserCollection(auth()->user()->pendingFriendsTo);
        return $this->sendResponse($data);
    }

}