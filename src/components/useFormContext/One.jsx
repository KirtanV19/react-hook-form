import { FormProvider, useForm } from "react-hook-form";
import OneNest from "./OneNest";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    firstName: yup.string().required("Firstname is required"),
    addressList: yup.array().of(
        yup.object().shape({
            street: yup.string().required("Street is required"),
            city: yup.string().required("City is required"),
            zip: yup.string().when("city", {
                is: (val) => val === "New York",
                then: (schema) => schema.required("Zip is required"),
                otherwise: (schema) => schema.notRequired(),
            }),
        })
    ),
});

const One = () => {
    const methods = useForm({
        mode: "all",
        defaultValues: {
            firstName: "",
            addressList: [{ street: "", city: "", zip: "" }],
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => console.log("data", data);

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow space-y-8"
            >
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">
                        First Name
                    </label>
                    <input
                        {...methods.register("firstName")}
                        placeholder="First Name"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${methods?.formState?.errors?.firstName
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                    />
                    {methods?.formState?.errors?.firstName && (
                        <p className="text-red-600 mt-1 text-sm">
                            {methods?.formState?.errors?.firstName?.message}
                        </p>
                    )}
                </div>
                <OneNest />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white transition-all px-4 py-2 rounded-md font-semibold w-full"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </FormProvider>
    );
};

export default One;
