<?php

namespace App\Http\Requests\UserDistance;

use App\Http\Requests\BaseFormRequest;
use Illuminate\Validation\Rule;


class ShowRequest extends BaseFormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date' => 'sometimes|date'
        ];
    }
}