import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div className="container mx-auto">
            <div className="w-3/4 mx-auto">
                <h1 className="text-3xl font-bold mb-3">Details Section</h1>
                
                <div>
                    <label  className="text-gray-700 text-sm font-bold mb-1 block">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="border rounded w-full py-2 px-3 font-normal text-sm"
                        {...register("name", { required: "This field is required" })}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-xs">{errors.name.message}</span>
                    )}
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label  className="text-gray-700 text-sm font-bold mb-1 block">
                            Country
                        </label>
                        <input
                            id="country"
                            type="text"
                            className="border rounded w-full py-2 px-3 font-normal text-sm"
                            {...register("country", { required: "This field is required" })}
                        />
                        {errors.country && (
                            <span className="text-red-500 text-xs">{errors.country.message}</span>
                        )}
                    </div>

                    <div className="flex-1">
                        <label  className="text-gray-700 text-sm font-bold mb-1 block">
                            City
                        </label>
                        <input
                            id="city"
                            type="text"
                            className="border rounded w-full py-2 px-3 font-normal text-sm"
                            {...register("city", { required: "This field is required" })}
                        />
                      
                    </div>
                    
                </div>

                <div>
                    <label  className="text-gray-700 text-sm font-bold mb-1 block">
                        Description
                    </label>
                    <textarea
                        id="description"
                         
                        className="border rounded w-full py-2 px-3 font-normal text-sm"
                       
                        rows={10} // Set the number of rows here
                        {...register("description", { required: "This field is required" })}
                    />
                    {errors.description && (
                        <span className="text-red-500 text-sm font-bold">{errors.description.message}</span>
                    )}
                </div>
                <div>
                    <label  className="text-gray-700 text-sm font-bold mb-1 block">
                        Price Per Night
                        </label>
                    <input
                    
                         type="number"
                        className="border rounded w-1/2 py-2 px-3 font-normal text-sm"
                       
                        min={1}// Set the number of rows here
                        {...register("pricePerNight", { required: "This field is required" })}
                    />
                    {errors.pricePerNight && (
                        <span className="text-red-500 text-sm font-bold">{errors.pricePerNight.message}</span>
                    )}
                </div>
                <div>
                    <label  className="text-gray-700 text-sm font-bold mb-1 block">
                       Star Rating
                        </label>
                    <select
                     className="border rounded w-1/2 py-2 px-3 font-normal text-sm"
                        {...register("starRating",{
                            required:"this field is required"
                        })}
                    >

                        <option value="" className="text-sm font-bold">Select as rating</option>
                        {[1,2,3,4,5].map((num)=>(

                            
                        <option value={num}>{num}</option>
                        ))}
                    </select>
                    {errors.pricePerNight && (
                        <span className="text-red-500 text-sm font-bold">{errors.pricePerNight.message}</span>
                    )}
                </div>
               
            </div>
        </div>
    );
};

export default DetailsSection;
