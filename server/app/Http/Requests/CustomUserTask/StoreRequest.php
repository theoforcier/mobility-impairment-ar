<?php

namespace App\Http\Requests\CustomUserTask;

use App\Http\Requests\BaseFormRequest;
use Illuminate\Auth\Access\AuthorizationException;
use Carbon\Carbon;

class StoreRequest extends BaseFormRequest
{

    protected function failedAuthorization()
    {
        $maxActive = config('constants.tasks.user_custom.max_active');
        $maxDaily = config('constants.tasks.user_custom.max_daily');
        throw new AuthorizationException("Maximum active task count reached (".$maxActive." active, ".$maxDaily." daily)");
    }

    public function authorize(): bool
    {
        $yesterday = Carbon::yesterday();

        $activeTasksCount = auth()->user()->customTasks()
            ->where('completed', 0)
            ->count();

        $recentTasksCount = auth()->user()->customTasks()
            ->where('created_at', '>', $yesterday)
            ->count();
        
        return $activeTasksCount < config('constants.tasks.user_custom.max_active') && 
            $recentTasksCount < config('constants.tasks.user_custom.max_daily');
    }

    public function rules(): array
    {
        return [
            'description' => 'required|string'
        ];
    }
}