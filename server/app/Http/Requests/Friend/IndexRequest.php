<?php

namespace App\Http\Requests\Friend;

use App\Http\Requests\BaseFormRequest;
use Illuminate\Validation\Rule;

class IndexRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [];
    }
}