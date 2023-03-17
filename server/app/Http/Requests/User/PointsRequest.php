<?php

namespace App\Http\Requests\User;

//use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\BaseFormRequest;

class PointsRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'from_date' => 'sometimes|date',
            'to_date'   => 'sometimes|date'
        ];
    }
}