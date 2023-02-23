<?php

namespace App\Http\Requests\UserCustomTask;

use App\Http\Requests\BaseFormRequest;

class IndexRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'completed' => 'sometimes|boolean'
        ];
    }
}