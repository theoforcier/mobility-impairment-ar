<?php
   
namespace App\Http\Controllers\API;
   
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\CustomUserTask\IndexRequest;
use App\Http\Requests\CustomUserTask\UpdateRequest;
use App\Http\Requests\CustomUserTask\DestroyRequest;

use App\Http\Resources\BasicTaskResource;
use App\Http\Resources\BasicTaskCollection;

use App\Models\BasicUserTask;


class BasicUserTaskController extends BaseController
{

    protected BasicUserTask $model;

    public function __construct(BasicUserTask $model)
    {
        $this->model = $model;
    }

    public function show(BasicUserTask $task): object
    {
        return $this->taskResponse($task);
    }

    
    public function index(IndexRequest $request)
    {
        $tasks = $tasks = auth()->user()->basicTasks();
        if (isset($request->validated()['completed']))
            $tasks = auth()->user()->basicTasks()->where('completed', $request->validated()['completed']);
            
        return $this->sendResponse(new BasicTaskCollection($tasks->get()));
    }
    
    public function complete(BasicUserTask $task, UpdateRequest $request)
    {
        $newTask = $this->model->markCompleteAndCreateNew($task->id);
        $task->completed = 1;

        return $this->sendResponse([
            'completed_task' => new BasicTaskResource($task),
            'new_task' => new BasicTaskResource($newTask)
        ]);
    }

    public function reroll(BasicUserTask $task, UpdateRequest $request)
    {
        $newTask = $this->model->deleteAndCreateNew($task->id);

        return $this->sendResponse([
            'removed_task' => new BasicTaskResource($task),
            'new_task' => new BasicTaskResource($newTask)
        ]);
    }

    protected function taskResponse(BasicUserTask $task)
    {
        return $this->sendResponse(new BasicTaskResource($task));
    }
    

}