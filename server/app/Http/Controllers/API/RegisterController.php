<?php
   
namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;

use App\Models\BasicUserTask;

   
class RegisterController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'display_name' => 'required|unique:users,display_name',
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        // Create user
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);

        // Create token
        $token = $user->createToken('AppSession');
        $success['token'] = $token->plainTextToken;
        $success['token_expiry'] = $token->accessToken->expired_at;
   
        // Assign initial basic tasks
        $maxDaily = config('constants.tasks.user_basic.max_daily');
        $basicTasksModel = new BasicUserTask;
        for ($i = 0; $i < $maxDaily; $i++) {
            $basicTasksModel->assignNewTask($user);
        }

        return $this->sendResponse($success);
    }
   
    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('AppSession');
            $success['token'] = $token->plainTextToken; 
            $success['token_expiry'] = $token->accessToken->expired_at;
   
            return $this->sendResponse($success);
        } 
        else{ 
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        } 
    }
}