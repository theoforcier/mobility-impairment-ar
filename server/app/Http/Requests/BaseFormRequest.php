<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exceptions\HttpResponseException;


class BaseFormRequest extends FormRequest
{

    protected function failedValidation(Validator $validator)
    {

        $errors = (new ValidationException($validator))->errors();
        $response = [
            'success' => false,
            'errors' => $errors
        ];

        throw new HttpResponseException(
            response()->json($response)
        );
    }
    
}