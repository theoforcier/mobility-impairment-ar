<?php

namespace App\Http\Requests\Friend;

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
            'display_name' =>  'sometimes|string',
            'first_name' =>    'sometimes|string',
            'last_name' =>     'sometimes|string',
        ];
    }
}