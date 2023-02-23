<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use DB;
use Exception;
use Carbon\Carbon;


class UserCustomTask extends Model
{
    use HasFactory;

    protected $fillable = ['description'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function remainingToday()
    {
        $yesterday = Carbon::yesterday();
        $recentTasks = auth()->user()->customTasks()
            ->where('created_at', '>', $yesterday)
            ->orderBy('created_at')
            ->get();

        $maxDaily = config('constants.tasks.user_custom.max_daily');
        $count = $maxDaily - count($recentTasks);

        $next = null;
        if (count($recentTasks)) {
            $oldest = new Carbon($recentTasks[0]->created_at);
            $next = $oldest->addDay();
        }

        return ['maximum' => $maxDaily, 'remaining' => $count, 'next_task' => $next];
    }

    public function markComplete($taskId)
    {
        DB::beginTransaction();

        try {

            // Update the user's points total            
            $task = $this->where('id', $taskId)->first();

            if ($task->completed)
                throw new Exception("Task is already marked as completed.");

            $affected = DB::table('users')
                ->where('id', auth()->id())
                ->increment('points_total', $task->points_reward);

            if ($affected != 1)
                throw new Exception("User points total could not be updated.");

            // Mark the task as complete!
            $affected = $this->where('id', $taskId)->update(['completed' => 1]);

            if ($affected != 1)
                throw new Exception("Task completion status could not be updated.");
            
        } catch(\Exception $e) {

            // report error to logger
            report($e);

            // undo any partial changes
            DB::rollBack();

            // return error message
            return $e->getMessage();
        }

        // Commit the changes and return
        DB::commit();
        return;
    }

}
