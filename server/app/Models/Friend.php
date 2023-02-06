<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;
use DB;

class Friend extends Model
{
    use HasFactory;

    public function unfriend($friend_id)
    {
        return DB::table('friends')
            ->where('user_id', auth()->id())
            ->where('friend_id', $friend_id)
            ->orwhere('user_id', $friend_id)
            ->where('friend_id', auth()->id())
            ->delete();
    }

}
