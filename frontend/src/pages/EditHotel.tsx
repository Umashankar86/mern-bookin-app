import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from '../api_client'
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForms";
import { useAppContext } from "../context/AppContext";

const EditHotel=()=>{
    const { showToast } = useAppContext(); 
    const {hotelId}=useParams();


    const {data:hotel}=useQuery("fetchMyHotelId",()=> apiClient.fetchMyHotelId(hotelId||''),{enabled:!!hotelId}
  


)

const{mutate,isLoading}=useMutation(apiClient.updateMyHotelById,{
         onSuccess:()=>showToast({ message: "Hotel updated", type: "SUCCESS" }),
         onError:()=>showToast({ message: "Error updating hotel", type: "ERROR" })
})



const handleSave=(hotelFormData:FormData)=>
    {
        mutate(hotelFormData)
    }
return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
};


export default EditHotel
