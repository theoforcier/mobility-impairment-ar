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
            'display_name' =>  'required|string|max:25'
        ];
    }
}