<?php
   
namespace App\Http\Controllers\API;
   
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\CustomUserTask\IndexRequest;
use App\Http\Requests\CustomUserTask\StoreRequest;
use App\Http\Requests\CustomUserTask\UpdateRequest;
use App\Http\Requests\CustomUserTask\DestroyRequest;
use Illuminate\Http\Request;

use App\Http\Resources\CustomTaskResource;
use App\Http\Resources\CustomTaskCollection;

use App\Models\CustomUserTask;



class CustomUserTaskController extends BaseController
{

    protected CustomUserTask $model;

    public function __construct(CustomUserTask $model)
    {
        $this->model = $model;
    }


    public function show(CustomUserTask $task): object
    {
        return $this->taskResponse($task);
    }

    
    public function index(IndexRequest $request)
    {
        $tasks = $tasks = auth()->user()->customTasks();
        
        if (isset($request->validated()['completed'])) {
            $completed = (bool)$request->validated()['completed'];
            
            if ($completed)
                $tasks = $tasks->whereNotNull('completed_at');
            else
                $tasks = $tasks->whereNull('completed_at');
        }

        return $this->sendResponse(new CustomTaskCollection($tasks->get()));
    }


    public function store(StoreRequest $request)
    {
        $taskId = auth()->user()->customTasks()->create($request->validated())->id;
        $task = $this->model->where('id', $taskId)->first();
        return $this->taskResponse($task);
    }

    public function rename(CustomUserTask $task, UpdateRequest $request)
    {
        $task->update($request->input());
        return $this->taskResponse($task);
    }

    public function complete(CustomUserTask $task, UpdateRequest $request)
    {
        $error = $this->model->markComplete($task->id);

        if ($error)
            return $this->sendError($error);
        
        $task->completed = 1;
        return $this->taskResponse($task);
    }

    public function remaining(Request $request)
    {
        $remaining = $this->model->remainingToday();

        return $this->sendResponse([
            'maximum'   => $remaining['maximum'],
            'remaining' => $remaining['remaining'], 
            'next_task' => $remaining['next_task']
        ]);
    }

    public function destroy(CustomUserTask $task, DestroyRequest $request)
    {
        $task->delete();
        return $this->sendResponse();
    }

    protected function taskResponse(CustomUserTask $task)
    {
        return $this->sendResponse(new CustomTaskResource($task));
    }
    

}