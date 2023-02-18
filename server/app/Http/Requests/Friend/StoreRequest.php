<?php

namespace App\Http\Requests\Friend;

use App\Http\Requests\BaseFormRequest;
use App\Models\User;

class StoreRequest extends BaseFormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'display_name' => 'required|string|max:25'
        ];
    }
}