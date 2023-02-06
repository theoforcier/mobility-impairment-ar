<?php

namespace App\Http\Requests\Friend;

use App\Http\Requests\BaseFormRequest;
use Illuminate\Validation\Rule;

class DestroyRequest extends BaseFormRequest
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
                Rule::exists('friends','friend_id')->where(function ($query) {
                    return $query->where('user_id', auth()->id())
                        ->where('friend_id', $this->request->get('friend_id'))
                        ->orwhere('user_id', $this->request->get('friend_id'))
                        ->where('friend_id', auth()->id());
                })
            ]
        ];
    }
}