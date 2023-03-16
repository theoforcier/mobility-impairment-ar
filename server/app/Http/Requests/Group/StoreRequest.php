<?php

namespace App\Http\Requests\Group;

use App\Http\Requests\BaseFormRequest;
use Illuminate\Validation\Rule;


class StoreRequest extends BaseFormRequest
{

    public function authorize(): bool
    {
        return auth()->user()->activeGroups()->count() == 0;
    }

    public function rules(): array
    {
        return [];
    }
}