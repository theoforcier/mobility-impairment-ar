<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Staudenmeir\LaravelMergedRelations\Eloquent\HasMergedRelationships;

use App\Models\Friend;



class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasMergedRelationships;

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'display_name',
        'first_name',
        'last_name',
        'bio',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Set default values on Model instance
    protected $attributes = [
        'points_total' => 0,
    ];


    public function friendsTo(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'friends', 'user_id', 'friend_id')
            ->withPivot('accepted')
            ->withTimestamps();
    }

 
    public function friendsFrom(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'friends', 'friend_id', 'user_id')
            ->withPivot('accepted')
            ->withTimestamps();
    }


    public function pendingFriendsTo(): BelongsToMany
    {
        return $this->friendsTo()->wherePivot('accepted', false);
    }
    
    public function pendingFriendsFrom(): BelongsToMany
    {
        return $this->friendsFrom()->wherePivot('accepted', false);
    }
    
    public function acceptedFriendsTo(): BelongsToMany
    {
        return $this->friendsTo()->wherePivot('accepted', true);
    }
    
    public function acceptedFriendsFrom(): BelongsToMany
    {
        return $this->friendsFrom()->wherePivot('accepted', true);
    }

    public function friends()
    {
        return $this->mergedRelationWithModel(User::class, 'friends_view');
    }

    public function searchUsers($str)
    {
        return User::where('display_name', 'like', '%'.$str.'%')
            ->where('id', '!=', auth()->id())
            ->get();
    }

    public function customTasks(): HasMany
    {
        return $this->HasMany(CustomUserTask::class);
    }

    public function basicTasks(): HasMany
    {
        return $this->HasMany(BasicUserTask::class);
    }

    public function totalPoints()
    {
        return $this->customTasks->sum('points_reward') + $this->basicTasks->sum('points_reward');
    }

    public function distances(): HasMany
    {
        return $this->HasMany(UserDistance::class);
    }

    public function totalMetersTravelled()
    {
        return $this->distances->sum('meters');
    }

}
