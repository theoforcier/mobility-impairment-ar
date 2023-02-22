<?php
   
namespace App\Http\Controllers\API;
   
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\UserCustomTask\IndexRequest;
use App\Http\Requests\UserCustomTask\StoreRequest;
use App\Http\Requests\UserCustomTask\UpdateRequest;
use App\Http\Requests\UserCustomTask\DestroyRequest;
use Illuminate\Http\Request;

use App\Http\Resources\CustomTaskResource;
use App\Http\Resources\CustomTaskCollection;

use App\Models\UserCustomTask;



class UserCustomTaskController extends BaseController
{

    protected UserCustomTask $model;

    public function __construct(UserCustomTask $model)
    {
        $this->model = $model;
    }


    public function show(UserCustomTask $task): object
    {
        return $this->taskResponse($task);
    }

    
    public function index(IndexRequest $request)
    {
        $tasks = $tasks = auth()->user()->customTasks();
        if (isset($request->validated()['completed']))
            $tasks = auth()->user()->customTasks()->where('completed', $request->validated()['completed']);
            
        return $this->sendResponse(new CustomTaskCollection($tasks->get()));
    }


    public function store(StoreRequest $request)
    {
        $taskId = auth()->user()->customTasks()->create($request->validated())->id;
        $task = $this->model->where('id', $taskId)->first();
        return $this->taskResponse($task);
    }

    public function rename(UserCustomTask $task, UpdateRequest $request)
    {
        $task->update($request->input());
        return $this->taskResponse($task);
    }

    public function complete(UserCustomTask $task, UpdateRequest $request)
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
        return $this->sendResponse(['remaining_tasks' => $remaining]);
    }

    public function destroy(UserCustomTask $task, DestroyRequest $request)
    {
        $task->delete();
        return $this->sendResponse();
    }

    protected function taskResponse(UserCustomTask $task)
    {
        return $this->sendResponse(new CustomTaskResource($task));
    }
    

}