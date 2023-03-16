<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function allUsers(): HasMany
    {
        return $this->belongsToMany(User::class, 'group_user')
            ->withPivot([
                'joined_at', 'left_at', 'invited_at', 'inviter_id'
            ]);
    }

    public function activeUsers(): HasMany
    {
        return $this->allUsers()
            ->wherePivot('joined_at', '!=', null)
            ->wherePivot('left_at', null);
    }


    public function invitedUsers(): HasMany
    {
        return $this->allUsers()
            ->wherePivot('invited_at', '!=', null)
            ->wherePivot('joined_at', null);
    }
}
