<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Friend extends Model
{
    use HasFactory;

    protected $table = 'friends';


    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'friends', 'user_id', 'friend_id');
    }




    public function getFriends()
    {
        return $this->with('users')->get();
    }
    /*
    public function getFriends() 
    {
        $myUserId = auth()->id();

        $friends = DB::table('friends')
            ->where([
                ['user1_id', '=', $myUserId],
                ['status', '=', 'accepted']
            ])
            ->orwhere([
                ['user2_id', '=', $myUserId],
                ['status', '=', 'friends']
            ])->get();

        return $friends;
    }

    public function getPendingRequests() 
    {
        $myUserId = auth()->id();

        $friends = DB::table('friends')
            ->where([
                ['user1_id', '=', $myUserId],
                ['status', '=', 'pending_first']
            ])
            ->orwhere([
                ['user2_id', '=', $myUserId],
                ['status', '=', 'pending_second']
            ])
            ->join('users', 'users.id', '=', '')
            ->get();

        return $friends;
    }

    */
}
