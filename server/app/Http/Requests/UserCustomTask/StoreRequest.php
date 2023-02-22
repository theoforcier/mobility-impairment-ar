<?php

namespace App\Http\Requests\UserCustomTask;

use App\Http\Requests\BaseFormRequest;
use Illuminate\Auth\Access\AuthorizationException;

class StoreRequest extends BaseFormRequest
{

    protected function failedAuthorization()
    {
        $max = config('constants.tasks.user_custom.max_active');
        throw new AuthorizationException("Maximum active task count (".$max.") reached.");
    }

    public function authorize(): bool
    {
        $activeTasksCount = auth()->user()->customTasks()->where('completed', 0)->count();
        return $activeTasksCount < config('constants.tasks.user_custom.max_active');
    }

    public function rules(): array
    {
        return [
            'description' => 'required|string',
            'completed' => 'prohibited'
        ];
    }
}