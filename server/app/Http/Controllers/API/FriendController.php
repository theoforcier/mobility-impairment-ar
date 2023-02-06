<?php
   
namespace App\Http\Controllers\API;
   
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\Friend\IndexRequest;
use App\Models\Friend;


class FriendController extends BaseController
{

    protected Friend $friend;

    public function __construct(Friend $friend)
    {
        $this->friend = $friend;
    }


    public function index()
    {
        $data = $this->friend->getFriends();
        return $this->sendResponse($data);
    }

}