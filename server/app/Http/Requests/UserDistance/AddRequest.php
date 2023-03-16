<?php

namespace App\Http\Requests\UserDistance;

use App\Http\Requests\BaseFormRequest;
use Illuminate\Validation\Rule;


class AddRequest extends BaseFormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $maxDistanceIncrement = config('constants.distance.max_increment');

        return [
            'date' => 'sometimes|date',
            'meters' => 'required|integer|gt:0|lte:'.$maxDistanceIncrement
        ];
    }
}