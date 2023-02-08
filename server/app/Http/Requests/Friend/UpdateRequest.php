<?php

namespace App\Http\Requests\Friend;

//use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\BaseFormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends BaseFormRequest
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
                'integer', 'gt:0',
                Rule::exists('friends', 'user_id')
                    ->where('friend_id', auth()->id())
            ]
        ];
    }
}