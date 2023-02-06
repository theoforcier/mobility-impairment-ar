<?php

namespace App\Http\Requests\Friend;

use App\Http\Requests\BaseFormRequest;

class StoreRequest extends BaseFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'friend_id' => [
                'required', 
                'exists:users,id', 
                'unique:friends,friend_id,NULL,id,user_id,'.auth()->id(),
                function($attribute, $value, $fail) {
                    if (auth()->id() == $value) {
                        $fail("Cannot befriend yourself");
                    }
                }
            ]
        ];
    }
}