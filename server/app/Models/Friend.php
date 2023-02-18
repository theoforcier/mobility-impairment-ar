<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use DB;

class Friend extends Model
{
    use HasFactory;

    public function friend(string $display_name)
    {
        $user = User::where('display_name', $display_name)->first();

        if (!$user)
            return "User not found.";

        elseif ($user->id == auth()->id())
            return "Cannot befriend yourself.";

        $match = $this->where('user_id', auth()->id())
            ->where('friend_id', $user->id)
            ->orwhere('user_id', $user->id)
            ->where('friend_id', auth()->id())
            ->exists();

        if ($match)
            return "Record already exists.";
        
        auth()->user()->friendsTo()->attach($user->id);
        return false;
    }

    public function unfriend(User $user)
    {
        return $this->where('user_id', auth()->id())
            ->where('friend_id', $user->id)
            ->orwhere('user_id', $user->id)
            ->where('friend_id', auth()->id())
            ->delete();
    }

}
