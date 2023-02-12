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
use App\Models\User;
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
        $error = $this->model->friend($request->input()['display_name']);

        if (!$error)
            return $this->sendResponse();
        return $this->sendError($error);
    }

    public function destroy(User $user, DestroyRequest $request)
    {
        $success = $this->model->unfriend($user);
        return $this->sendResponse(null);
    }

    public function accept(User $user, UpdateRequest $request)
    {
        auth()->user()->friendsFrom()->updateExistingPivot($user->id, ['accepted' => true]);
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