<?php

namespace App\Http\Requests\User;

//use Illuminate\Foundation\Http\FormRequest;
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
            'display_name' =>  'sometimes|string|max:25|unique:users,display_name',
            'first_name' =>    'sometimes|string|max:15',
            'last_name' =>     'sometimes|string|max:15'
        ];
    }
}