import { useMutation } from "react-query";
import { useAppContext } from "../context/AppContext";
import * as apiClient from '../api_client';
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForms";

const AddHotel = () => {
    const { showToast } = useAppContext();
    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {
            showToast({ message: "Hotel Saved!", type: "SUCCESS" });
        },
        onError: () => {
            showToast({ message: "Error Saving Hotel", type: "ERROR" });
        }
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    }

    return (
        <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    );
};

export default AddHotel;
