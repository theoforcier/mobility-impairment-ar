<?php

namespace App\Http\Requests\Friend;

use App\Http\Requests\BaseFormRequest;

class StoreRequest extends BaseFormRequest
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