<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;


class TaskType extends Model
{
    use HasFactory;

    public function basicTasks(): HasMany
    {
        return $this->HasMany(BasicUserTask::class);
    }

}
