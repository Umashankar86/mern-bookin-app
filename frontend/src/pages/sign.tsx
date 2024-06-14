import { useForm } from "react-hook-form"
import { useMutation } from "react-query";
import * as apiClient from '../api_client';
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

export type SignInformData={
    email: string;
    password: string;
}

const SignIN=()=>{
    const{showToast}=useAppContext()
    const queryClient = useQueryClient();

    const navigate=useNavigate()
    const {register , formState:{errors},handleSubmit}=useForm<SignInformData>()

const mutation=useMutation(apiClient.signIn,{
    onSuccess:async()=>{
        await queryClient.invalidateQueries("validateToken");
         showToast({message:"Sign IN Successful",type:"SUCCESS"})
         navigate("/");
    },onError:(error:Error)=>
        {
            showToast({message:error.message,type:"ERROR"})
        }
});

const onSubmit=handleSubmit((data)=>{
    mutation.mutate(data)

})



    return(
        <form className="flex flex-col gap-5 px-20" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold mb-5">Sign In</h2>
            <div className="flex-1">
                <label className="text-gray-700 text-sm font-bold mb-1">
                    Email
                    <input
                        id="email"
                        type="email"
                        className="border rounded w-full py-2 px-3 font-normal"
                        {...register("email", { required: "This field is required" })}
                    />
                
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
                </label>
            </div>
            <div className="flex-1">
                <label className="text-gray-700 text-sm font-bold mb-1">
                    Password
                    <input
                        id="password"
                        type="password"
                        className="border rounded w-full py-2 px-3 font-normal"
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 6,
                                message: "Password must be minimum 6 characters"
                            },
                        })}
                    />
                
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}</label>
            </div>
            <span className="flex items-center justify-between">
                <span className="text_sm">
                    Not Registered?<Link className="underline" to="/register">Create an account here</Link>
                </span>
                <button type="submit" className="bg-blue-600 text-white p-5 font-bold hover:bg-blue-500 text-xl">Login</button>
            </span>
        </form>
    )
}
export default SignIN;