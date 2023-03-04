<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use DB;
use Exception;
use Carbon\Carbon;


class BasicUserTask extends Model
{
    use HasFactory;

    protected $fillable = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function taskDifficulty(): BelongsTo
    {
        return $this->belongsTo(TaskDifficulty::class);
    }

    public function taskType(): BelongsTo
    {
        return $this->belongsTo(TaskType::class);
    }

    public function pointsReward()
    {
        return floor($this->taskType->base_points * $this->taskDifficulty->points_multiplier);
    }

    public function quantity()
    {
        return floor($this->taskType->base_quantity * $this->taskDifficulty->quantity_multiplier);
    }

    public function assignNewTask($user)
    {
        // Get a random task type
        $type = TaskType::inRandomOrder()->first();

        // Get a difficulty level equal or below our max threshold
        $difficulty = TaskDifficulty::where('threshold', '<=', $user->points_total)->inRandomOrder()->first();

        // Create task with this information
        $task = new BasicUserTask;
        $task->user_id = $user->id;
        $task->task_type_id = $type->id;
        $task->task_difficulty_id = $difficulty->id;
        $task->save();

        return $task;
    }

    public function markCompleteAndCreateNew($taskId)
    {

        $newTask = null;
        DB::beginTransaction();

        try {

            // Find the task       
            $task = $this->find($taskId);

            // We can only mark active tasks as complete
            if ($task->completed)
                throw new Exception("Task is already marked as completed.");

            // Update the user's points total
            $affected = DB::table('users')
                ->where('id', auth()->id())
                ->increment('points_total', $task->pointsReward());

            if ($affected != 1)
                throw new Exception("User points total could not be updated.");

            // Mark the task as complete!
            $affected = $this->where('id', $taskId)->update(['completed' => 1]);

            if ($affected != 1)
                throw new Exception("Task completion status could not be updated.");

            // Assign a new task if necessary
            $tasksCreatedToday = auth()->user()->basicTasks()
                ->where('created_at', '>', Carbon::yesterday())
                ->count();
                
            $maxDaily = config('constants.tasks.user_basic.max_daily');

            if ($tasksCreatedToday < $maxDaily) {
                $newTask = $this->assignNewTask(auth()->user());

                if (!$newTask)
                    throw new Exception("User could not be assigned a new task.");
            }
            
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
        return $newTask;
    }



    public function deleteAndCreateNew($taskId)
    {

        $newTask = null;
        DB::beginTransaction();

        try {

            $task = $this->find($taskId);

            if ($task->completed)
                throw new Exception("Cannot reroll a completed task.");

            // Delete the task
            $affected = $task->delete();

            if ($affected != 1)
                throw new Exception("Could not delete task.");

            // Assign a new task
            $newTask = $this->assignNewTask(auth()->user());

            if (!$newTask)
                throw new Exception("User could not be assigned a new task.");
            
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
        return $newTask;
    }
}
