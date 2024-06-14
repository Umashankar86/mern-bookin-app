import { useForm  } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from '../api_client';
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
    FirstName: string;  // Change String to string
    LastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const navigate =useNavigate();
    const { showToast } = useAppContext(); // Correctly call useAppContext to get showToast

    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: () => {
            showToast({ message: "Register Success!", type: "SUCCESS" });
            navigate("/");
        },
        onError: (error: Error) => {
            console.log(error.message);
            showToast({ message: error.message, type: "ERROR" }); // Optionally show error toast
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="flex flex-col gap-5 px-20" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold mb-5">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                    <label className="text-gray-700 text-sm font-bold mb-1">
                        First Name
                        <input
                            id="FirstName"
                            type="text"
                            className="border rounded w-full py-2 px-3 font-normal"
                            {...register("FirstName", { required: "This field is required" })}
                        />
                    
                    {errors.FirstName && (
                        <span className="text-red-500">{errors.FirstName.message}</span>
                    )}</label>
                </div>
                <div className="flex-1">
                    <label className="text-gray-700 text-sm font-bold mb-1">
                        Last Name
                        <input
                            id="LastName"
                            type="text"
                            className="border rounded w-full py-2 px-3 font-normal"
                            {...register("LastName", { required: "This field is required" })}
                        />
                    
                    {errors.LastName && (
                        <span className="text-red-500">{errors.LastName.message}</span>
                    )}</label>
                </div>
            </div>
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
            
            <div className="flex-1">
                <label className="text-gray-700 text-sm font-bold mb-1">
                    Confirm Password
                    <input
                        id="c-password"
                        type="password"
                        className="border rounded w-full py-2 px-3 font-normal"
                        {...register("confirmPassword", {
                            validate: (val) => {
                                if (!val) {
                                    return "This field is required";
                                } else if (watch("password") !== val) {
                                    return "Your passwords do not match";
                                }
                            }
                        })}
                    />
               
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )} </label>
            </div>
            <span>
                <button type="submit" className="bg-blue-600 text-white p-5 font-bold hover:bg-blue-500 text-xl">Create account</button>
            </span>
        </form>
    );
};

export default Register;
