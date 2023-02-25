<?php

namespace App\Http\Requests\CustomUserTask;

use App\Http\Requests\BaseFormRequest;

class UpdateRequest extends BaseFormRequest
{

    public function authorize(): bool
    {
        $task = $this->route('task');
        return $task->user->id === auth()->id() && $task->completed == false;
    }

    public function rules(): array
    {
        return [];
    }
}