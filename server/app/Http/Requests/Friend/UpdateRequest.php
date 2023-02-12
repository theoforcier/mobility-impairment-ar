<?php

namespace App\Http\Requests\Friend;

use App\Http\Requests\BaseFormRequest;
use Illuminate\Validation\Rule;

use App\Models\Friend;


class UpdateRequest extends BaseFormRequest
{

    protected function prepareForValidation() 
    {
        $this->merge(['friend_id' => $this->route('user')->id]);
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'friend_id' => [
                Rule::exists('friends', 'user_id')
                    ->where('friend_id', auth()->id())
            ]
        ];
    }
}